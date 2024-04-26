import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import backgroundImageUrl from "../images/food.jpeg";
import Parse from "../services/parse";
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  /*useEffect(() => {
    if (Parse.User.current()?.authenticated) {
      router.push("/home");
    }
  }, [router]);*/


  return (
    <>
      <Head>
        <title>MealMaestro</title>
        <link rel="icon" type="image/png" href="./favicon.ico" />
        {/* Other head elements like meta tags can be added here */}
      </Head>
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundImage: `url('/images/food.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '0 10%'
      }}>
        <h1 style={{
          color: '#45a049',
          fontSize: '96px',
          maxWidth: '40%',
          textAlign: 'left'
        }}>
          Welcome.
        </h1>
        <div className="card p-4" style={{
          textAlign: 'center',
          width: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <Link href="/login" style={{ textDecoration: 'none' }}>
              <button className="btn" style={{
                width: '100%',
                backgroundColor: '#006400',
                color: '#FFFFFF'
              }}>Login</button>
            </Link>
          </div>
          <div style={{ fontSize: 'small', marginBottom: '20px' }}>OR</div>
          <div>
            <Link href="/register" style={{ textDecoration: 'none' }}>
              <button className="btn btn-secondary" style={{ width: '100%', backgroundColor: "#808080" }}>Register</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );

}
