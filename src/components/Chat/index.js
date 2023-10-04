import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import { auth, database, storage } from "../../../firebaseConfig";
import {useConversationStore, useFrienIdStore} from '../../../reducer';
import { format } from "date-fns";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker'; // Importe a biblioteca de escolha de imagem
import { ref, getDownloadURL, putFile } from '@react-native-firebase/storage';
import { set, getDatabase } from '@react-native-firebase/database';



const Chat = () => {
    const conversationId = useConversationStore((state) => state.conversationId);
    const friendId = useFrienIdStore((state) => state.friendId);
    const [userProfileImage, setUserProfileImage] = useState(null);
    const [userName, setUsername] = useState("");
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleChooseImage = () => {
        // Configurar as opções da biblioteca de escolha de imagem
        const options = {
            mediaType: 'photo', // Você também pode usar 'mixed' para permitir arquivos de mídia mistos (imagens e vídeos)
        };

        // Chamar a biblioteca de escolha de imagem
        launchImageLibrary(options, (response) => {
            if (response.assets && response.assets.length > 0) {
                // Você pode fazer upload da imagem selecionada para o Firebase Storage aqui
                const image = response.assets[0];

                // Configure uma referência única para o arquivo no Firebase Storage
                const storageRef = ref(storage, `images/${image.fileName}`);

                // Faça o upload da imagem
                storageRef.putFile(image.uri)
                    .then(async (snapshot) => {
                        // Obtenha a URL do arquivo carregado
                        const imageUrl = await getDownloadURL(storageRef);

                        // Crie um objeto de mensagem que inclui a URL da imagem e outras informações necessárias
                        const newMessageData = {
                            senderUid: uid,
                            imageUrl: imageUrl, // Armazene a URL da imagem no Firebase Realtime Database
                            timestamp: Date.now(),
                        };

                        // Armazene a nova mensagem no Realtime Database
                        const newMessageRef = database
                            .ref(`conversations/${conversationId}/messages`)
                            .push();
                        newMessageRef.set(newMessageData);

                        // Atualize o estado das mensagens (opcional)
                        setMessages([...messages, newMessageData]);
                    })
                    .catch((error) => {
                        console.error("Erro ao fazer upload da imagem:", error);
                    });
            }
        });
    };
    
    if (!conversationId) {
        return (
            <View>
                <Text>Erro: ID da conversa não definido.</Text>
            </View>
        );
    }
    const uid = auth.currentUser.uid;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        // Carregar mensagens da conversa
        const messagesRef = database.ref(
            `conversations/${conversationId}/messages`
        );
        messagesRef.on("value", (snapshot) => {
            const messagesData = snapshot.val();
            if (messagesData) {
                const messagesArray = Object.values(messagesData).map((message) => ({
                    ...message,
                    // Converta o timestamp para uma string de data e hora legível
                    timestamp: format(new Date(message.timestamp), "dd/MM/yy HH:mm"),
                }));
    
                // Ordene as mensagens pelo timestamp antes de renderizá-las
                messagesArray.sort((a, b) => a.timestamp - b.timestamp);
    
                setMessages(messagesArray);
            }
        });
        // ...
    }, [conversationId]);
    
    useEffect(() => {
        // Verifique se o UID do usuário está disponível no módulo de autenticação
        //const userUid = (`auth.currentUser.${uid}`);
        const uid = auth.currentUser.uid;
        console.log(uid);
        if (!uid) {
            // Lidar com a situação em que o UID do usuário não está disponível
            console.error("UID do usuário não encontrado.");
            return;
        }

        // Carregue os dados do usuário (imagem de perfil) do Realtime Database
        const userRef = database.ref(`users/${friendId}`);

        userRef.on("value", (snapshot) => {
            const userData = snapshot.val();
            //console.log('userData:', userData); // Verifique se userData.profileImage está correto
            if (userData && userData.profileImage && userData.name) {
                setUserProfileImage(userData.profileImage);
                setUsername(userData.name);
            }
        });
    }, []);

    const handleSend = () => {
        const timestamp = Date.now();
        const newMessageData = {
            senderUid: uid,
            text: newMessage,
            timestamp,
        };
        const newMessageRef = database
            .ref(`conversations/${conversationId}/messages`)
            .push();
        newMessageRef.set(newMessageData);

        setNewMessage("");
    };

    const renderMessage = ({ item, index }) => {
        // Verifique se a mensagem foi enviada pelo usuário atual
        const isCurrentUser = item.senderUid === uid;

        return (
            <View
              style={[
                styles.messageContainer,
                isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
              ]}
              key={index}
            >
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.messageImage} // Estilo para a imagem
                />
              )}
              {item.text && (
                <Text style={styles.messageText}>{item.text}</Text>
              )}
              <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
            </View>
          );
        };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon name="arrow-left-long" color={"white"} size={23} style={styles.headerIcon} />
                </TouchableOpacity>
                <View style={styles.headerUserInfo}>
                    <Text style={styles.textProfileName}>{userName}</Text>
                    {userProfileImage ? (
                        <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
                    ) : (
                        <Image source={require('../../assets/logo.png')} style={styles.profileImage} />
                    )}
                </View>
            </View>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderMessage}
                contentContainerStyle={styles.messagesContainer}
                inverted // Para exibir as mensagens mais recentes no topo
            />
            <View style={styles.files}>
                <TouchableOpacity style={{marginHorizontal: 10}} onPress={handleChooseImage}>
                    <Icon name="image" size={25} color="#1B0A3E" />
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={newMessage}
                    onChangeText={(text) => setNewMessage(text)}
                    placeholder="Digite sua mensagem"
                    style={styles.input}
                />
                <TouchableOpacity onPress={handleSend}>
                    <Text>Enviar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E4E1DD", // Cor de fundo
    },
    messagesContainer: {
        padding: 16,
        flexGrow: 1,
    },
    messageContainer: {
        maxWidth: "80%", // Largura máxima das mensagens
        marginBottom: 16,
        padding: 12,
        borderRadius: 8,
    },
    currentUserMessage: {
        alignSelf: "flex-end", // Mensagens do usuário atual à direita
        backgroundColor: "#1B0A3E", // Cor de fundo para mensagens do usuário atual
    },
    otherUserMessage: {
        alignSelf: "flex-start", // Mensagens de outros usuários à esquerda
        backgroundColor: "#BAEFA5", // Cor de fundo para mensagens de outros usuários
    },
    messageText: {
        fontSize: 16,
        color: "#fff", // Cor do texto das mensagens
    },
    messageTimestamp: {
        fontSize: 12,
        color: "#888", // Cor do texto do timestamp das mensagens
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 8,
    },

    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "black",
    },
    textProfileName: {
        color: "#F10808",
        fontWeight: "bold",
        fontSize: 20,
        marginEnd: 20,
    },
    header: {
    },
    image: {
        alignItems: "flex-end",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1B0A3E",
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 80, // Altura do cabeçalho personalizado
        borderBottomLeftRadius: 60,
    },
    headerIcon: {
        fontSize: 23,
        color: "white",
    },
    headerUserInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    files:{
        flexDirection: "row",
        justifyContent: "flex-end",
        marginHorizontal: 10,
        marginVertical: 5
    },
    messageImage: {
        width: 200, 
        height: 200, 
        resizeMode: 'cover', 
        borderRadius: 8, 
        marginVertical: 8, 
      },
});

export default Chat;
