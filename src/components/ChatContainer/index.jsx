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
        setMessages,
        reload,
        input, 
        status,
        stop,
        error,
        handleInputChange, 
        handleSubmit 
    } = useChat();

    const isLoading = status == 'submitted' || status == 'streaming';

    function removeMessage(messageId) {
        setMessages(messages.filter(message => message.id != messageId))
    }

    return (
        <section className={styles.container}>
            <ChatHeader />
            <div className={styles.chat}>
                {messages.map((msg) => (
                    <ChatBubble
                        key={msg.id}
                        message={msg.content}
                        isUser={msg.role == 'user'} 
                        onRemove={() => removeMessage(msg.id)}
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
            {error && (<p>Ops! Alguma coisa deu errado!</p>)}
            {(!isLoading && messages.length > 0) && <RetryButton onClick={reload} />}
            <ChatForm 
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </section>
    );
};