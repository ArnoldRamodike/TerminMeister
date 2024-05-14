import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import getFavoriteListings from '../actions/getFavoriteListings'
import FavoritesClient from './FavoritesClient'

const FavoritePage = async () => {

    const currentUser = await getCurrentUser();
    const listings = await getFavoriteListings();

    if ( listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title='No Favorites found' subtitle='Looks like you have no favorites'/>
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <FavoritesClient
          listings={listings}
          currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default FavoritePage