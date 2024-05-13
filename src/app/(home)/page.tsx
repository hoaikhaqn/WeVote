import HomePageTemplate from '@/components/templates/Homepage'
import endpoints from '@/config/endpoints'
import fetchAPI from '@/lib/fetch'
import { LastPoll, PollDocument } from '@/models/polls'
import React from 'react'

export default async function HomePage() {
  return <HomePageTemplate />
}
