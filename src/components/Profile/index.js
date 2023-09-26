import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import { auth, database } from '../../../firebaseConfig';
import { ref, getDownloadURL, putFile } from '@react-native-firebase/storage';
import { update } from '@react-native-firebase/database';
import { storage } from '../../../firebaseConfig';


const defaultImageUrl = 'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg';

const Profile = () => {
    const [userProfileImage, setUserProfileImage] = useState(null);
    const [userName, setUsername] = useState('');
    const [name, setName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [renderImage, setRenderImage] = useState(null);
    //const navigation = useNavigation();

    useEffect(() => {
        const uid = auth.currentUser.uid;
        if (!uid) {
            console.error('UID do usuário não encontrado.');
            return;
        }

        const userRef = database.ref(`users/${uid}`);

        userRef.on('value', (snapshot) => {
            const userData = snapshot.val();
            if (userData && userData.profileImage && userData.name) {
                setUserProfileImage(userData.profileImage);
                setUsername(userData.name);
                setName(userData.name); // Defina o valor inicial do nome
            }
        });
    }, []);

    const onHandleUpdate = async (uid) => {
        try {
            const userRef = database.ref(`users/${uid}`);

            if (selectedImage == null) {
                imageUrl = userProfileImage;
            } else {
                const { uri } = renderImage;
                const filename = uri.substring(uri.lastIndexOf('/') + 1);
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                const storageRef = ref(storage, `users/${uid}/${filename}`);
                await putFile(storageRef, uploadUri);
                imageUrl = await getDownloadURL(storageRef);
            }

            const userData = {
                name: name,
                profileImage: imageUrl,
            };

            await update(userRef, userData);
            console.log('Perfil atualizado com sucesso!');
            alert('Perfil atualizado com sucesso!');
        } catch (err) {
            console.error('Erro ao atualizar perfil:', err);
            alert('Erro ao atualizar perfil', err.message);
        }
    };

    const handleImageUpload = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'profileImages',
            },
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('Escolha de imagem cancelada');
            } else if (response.error) {
                console.error('Erro ao escolher imagem: ', response.error);
            } else {
                const source = response.assets[0].uri;
                const teste = { uri: response.assets[0].uri };
                setSelectedImage(source);
                setRenderImage(teste);
            }
        });
    };

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#5FFBF1', '#00e4ff', '#44a4ff', '#c957ce', '#c348b5', '#cb3aab', '#d3279f', '#d90092', '#ea0074', '#f11256', '#f03737', '#e75312']}
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={handleImageUpload}>
                    <Image source={{ uri: selectedImage || userProfileImage }} style={styles.profileImage} />
                </TouchableOpacity>
                <Text style={styles.textProfileName}>{userName}</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    autoCapitalize="none"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>
                <TouchableOpacity style={styles.button} onPress={() => onHandleUpdate(auth.currentUser.uid)} >
                    <Text style={styles.profileImage} >
                        Atualizar perfil
                    </Text>
                </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'white',
    },
    textProfileName: {
        color: 'white',
        fontSize: 24,
        marginTop: 16,
        fontWeight: 'bold',
    },
    form: {
        marginTop: 40,
    },
    input: {
        backgroundColor: 'white',
        height: 48,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#FF4500',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

});

export default Profile;