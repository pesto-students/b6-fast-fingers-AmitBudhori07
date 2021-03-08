import Link from "next/link";
import fetchJson from 'service/fetchJson'
import {useUser} from "data/useUser";
import { useRouter } from 'next/router';

const Nav = ({title}) => {
  const { user, mutateUser } = useUser()
  const router = useRouter()
  return (
    <header>
      <nav>
        <ul>
          {!user?.isLoggedIn && (
            <li>
            <Link href={title==='Register'?"/":"/Register"}>
              <a className="btn btn-danger">{title==='Register'?"SignIn":"SignUp"}</a>
            </Link>
            </li>
          )}
          {user?.isLoggedIn && (
            <>
              <li>
              <Link href='/'>
            <a className="btn btn-danger" onClick={async() => {
                    const res=await fetchJson('/api/logout')
                    console.log(res)
                     mutateUser(res)
                    debugger;
                    window.location.reload();
            }}
            >Logout</a>
        </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        li {
          margin-right: 1rem;
          display: flex;
        }

        li:first-child {
          margin-left: auto;
        }

        a {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        a img {
          margin-right: 1em;
        }

        header {
          padding: 0.2rem;
          color: #fff;
        }
      `}</style>
    </header>
  )
};

export default Nav;
