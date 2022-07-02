import { Input, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState, ModalView } from '../../../atoms/authModalAtom';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase/clientApp';
import {FIREBASE_ERRORS} from '../../../firebase/errors'

type SignUp = {
    toggleView: (view: ModalView) => void;
};

const SignUp:React.FC<SignUp> = ({toggleView}) => {
    
    const setAuthModalState = useSetRecoilState(authModalState)
    const [error, setError] = useState('')
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        userError,
      ] = useCreateUserWithEmailAndPassword(auth);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(error) setError('')
        if(signUpForm.password !== signUpForm.confirmPassword){
            setError('Password do not match')
            return;
        }
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm(prev => ({
            ...prev,
            [event.target.name] : event.target.value
        }))
    }
    return (
        <form onSubmit={onSubmit}>
            <Input 
                name="email" 
                type="email" 
                placeholder='email' 
                mb={2} 
                onChange={onChange}
                fontSize="10pt"
                _placeholder={{color:"gray.500"}}
                _hover={{
                    bg:'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg:"white",
                    border: '1px solid',
                    borderColor:  'blue.500',
                }}
                bg="gray.50"
            />
            <Input 
                name="password" 
                type="password" 
                placeholder='password' 
                onChange={onChange}
                mb={2} 
                fontSize="10pt"
                _placeholder={{color:"gray.500"}}
                _hover={{
                    bg:'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg:"white",
                    border: '1px solid',
                    borderColor:  'blue.500',
                }}
                bg="gray.50"
            />
            <Input 
                name="confirmPassword" 
                type="password" 
                placeholder='confirm password' 
                onChange={onChange}
                mb={2} 
                fontSize="10pt"
                _placeholder={{color:"gray.500"}}
                _hover={{
                    bg:'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg:"white",
                    border: '1px solid',
                    borderColor:  'blue.500',
                }}
                bg="gray.50"
            />
            <Text textAlign="center" color="red" fontSize="10pt">{error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}</Text>
            <Button width="100%" height="36px" mt={2} mb={2} type="submit" isLoading={loading}>Sign Up</Button>
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>Already a redditor?</Text>
                <Text 
                    onClick={() => toggleView("login")}
                    color="blue.500" 
                    fontWeight="700" 
                    cursor="pointer"
                >
                    LOG IN
                </Text>
            </Flex>
        </form>
    )
}
export default SignUp;