// export default function Home() {
//   return <h1>Home Page</h1>;
// }
import { useAuth } from "react-oidc-context";

export default function Home() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "5670nqpbc3pj9t1g9g5b23aj7a";
    const logoutUri = "https://main.d24v52d6vjpw0i.amplifyapp.com/";
    const cognitoDomain =
      "https://us-east-1lbik47yti.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}
