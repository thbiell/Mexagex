import messaging from '@react-native-firebase/messaging';

// Configurar o serviço de mensagens
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // Lidar com a notificação push aqui, por exemplo, mostrar uma notificação local
});

import messaging from '@react-native-firebase/messaging';

// Escutar mensagens recebidas no aplicativo
useEffect(() => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    // Lidar com a notificação dentro do aplicativo
  });

  return unsubscribe;
}, []);
