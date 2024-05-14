'use client'

import React from 'react'
import { Interface } from 'readline'
import { SafeListing, SafeReservation, SafeUser } from '../types';
import { useRouter } from 'next/navigation';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

interface FavoritesClientProps{
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const FavoritesClient:React.FC<FavoritesClientProps> = ({currentUser, listings}) => {
  const router = useRouter();
  return (
    <Container>
      <Heading title='Favorites' subtitle='List of places you have favorited'/>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
         { listings.map((listing) => (
          <ListingCard  
           key={listing.id}
            currentUser={currentUser}
            data={listing}
          />))}
        </div>
    </Container>
  )
}

export default FavoritesClient