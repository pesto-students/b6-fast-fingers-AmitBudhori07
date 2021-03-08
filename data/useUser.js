import { useEffect } from 'react'
import Router from 'next/router'
import useSWR, { mutate } from 'swr';
import { getScore } from "service/userApi";

export  function useUser({
  redirectTo = false,
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR('/api/user');
  const loading = !user;
  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      localStorage.setItem('token',user.token)
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser,loading }
}

export  function useScore(){
  const { data, mutate } = useSWR("/fastfinger/scorelist", getScore);
  const loading = !data;
  const scores = data && data.score
/*   scores = Array.isArray(data) ? data :data.scores;
 */  return {
    loading,
    scores,
    mutate
  }
}
