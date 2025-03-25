import { Head, Preview, Tailwind, Body, Section, Text,  Heading } from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

interface Props {
  domain: string
  baseUrl: string
  token: string
}

export function VerificationTemplate({ token }: Props){
  
  
  return (
    <Html>
      <Head />
      <Preview>Верификация аккаунта</Preview>
      <Tailwind>
        <Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
          <Section className='text-center mb-8'>
          {/* <Img src='/public/logo.svg' width={32} height={32} className='mx-auto' alt='green-house-logo' /> */}
            <Heading className='text-3xl font-bold text-black'>Подтверждение вашей почты</Heading>
            <Text className='text-slate-600 text-lg'>Для подтверждения аккаунта введите этот код на сайте</Text>
            <Text className='text-slate-900 font-bold text-4xl text-green-800'>{ token }</Text>

          </Section>
          
        </Body> 
      </Tailwind>
    </Html>
  );
};

export default VerificationTemplate
