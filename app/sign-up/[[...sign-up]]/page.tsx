import React from 'react';
import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
    return (
        <SignUp
            path="/sign-up"
            routing="path"
            fallbackRedirectUrl={'/new-user'}
            signInForceRedirectUrl={'/new-user'}
            forceRedirectUrl={'/new-user'}
        />
    );
};

export default SignUpPage;
