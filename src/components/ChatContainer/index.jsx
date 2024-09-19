'use client'

import Button from '../Button';
import ChatBubble from '../ChatBubble';
import { ChatForm } from '../ChatForm';
import { ChatHeader } from '../ChatHeader';
import { IconStop } from '../Icons';
import { Loader } from '../Loader';
import { RetryButton } from '../RetryButton';
import styles from './container.module.css';

export const ChatContainer = () => {
    const messages = [
        { id: 1, message: "Estou aqui para ajudar na escolha do seu vídeo.", isUser: false },
        { id: 2, message: "Para começar, qual sua faixa etária?", isUser: false },
        { id: 3, message: "25", isUser: true },
        {
            id: 4, message: `
Escolha um dos temas listados abaixo:
- Saúde
- Viagem
- Economia
- Alimentação
- Esporte
- Humor
- Programação
- Política
- Religião
- Entretenimento      
            `,
            isUser: false
        },
        {
            id: 5, 
            message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus voluptatibus iste accusantium modi? Sed, mollitia beatae similique neque vel sit libero ipsa ex natus ullam! Suscipit sit iure ex vel.",
            isUser: true
        }
    ];

    return (
        <section className={styles.container}>
            <ChatHeader />
            <div className={styles.chat}>
                
                {messages.map((msg) => (
                    <ChatBubble
                        key={msg.id}
                        message={msg.message}
                        isUser={msg.isUser} 
                        onRemove={() => console.log('remove message', msg.id)}
                    />
                ))}

            </div>
            <ChatForm />
        </section>
    );
};