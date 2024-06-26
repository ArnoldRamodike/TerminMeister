'use client'

import React, { useEffect } from 'react'
import EmptyState from './components/EmptyState';

interface ErrorStateProps{
    error: Error;
}

const Error: React.FC<ErrorStateProps> = ({error}) => {

    useEffect(() => {
        console.error(error);
        
    },[error])
  return (
    <EmptyState title='Uh ou' subtitle='Something went wrong' />

  )
}

export default Error