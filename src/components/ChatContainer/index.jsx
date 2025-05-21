'use client'

import Button from '../Button';
import ChatBubble from '../ChatBubble';
import { ChatForm } from '../ChatForm';
import { ChatHeader } from '../ChatHeader';
import { IconStop } from '../Icons';
import { Loader } from '../Loader';
import { RetryButton } from '../RetryButton';
import styles from './container.module.css';
import { useChat } from '@ai-sdk/react'

export const ChatContainer = () => {
    const { 
        messages, 
        input, 
        status,
        stop,
        handleInputChange, 
        handleSubmit 
    } = useChat();

    const isLoading = status == 'submitted' || status == 'streaming';

    return (
        <section className={styles.container}>
            <ChatHeader />
            <div className={styles.chat}>
                {messages.map((msg) => (
                    <ChatBubble
                        key={msg.id}
                        message={msg.content}
                        isUser={msg.role == 'user'} 
                        onRemove={() => console.log('remove message', msg.id)}
                    />
                ))}

            </div>
            {isLoading && (
                <div>
                    <Loader />
                    <Button onClick={stop} variant='danger'>
                        <IconStop /> Parar
                    </Button>
                </div>
            )}
            <ChatForm 
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </section>
    );
};