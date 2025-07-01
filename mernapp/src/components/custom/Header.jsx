import React, { useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc"
import axios from 'axios'

// ✅ Import your logo from assets
import logo from '../../assets/logo.png' // Adjust the path as necessary

function Header() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')))
  const [openDialog, setOpenDialog] = useState(false)

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data))
      setUser(resp.data) // update state
      setOpenDialog(false)
    }).catch((error) => {
      console.error("Error fetching user profile: ", error)
    })
  }

  return (
    <div className="shadow-sm flex justify-between items-center px-6 py-4">
      {/* ✅ Bigger header logo */}
      <img src={logo} alt="Logo" className="h-14 w-auto" /> {/* h-14 instead of h-10 */}

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">+ Create Trip</Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  alt="User Profile"
                  className="h-[40px] w-[40px] rounded-full border border-gray-300 bg-gray-100"
                  onError={e => { e.target.onerror = null; e.target.src = '/placeholder.jpg'; }}
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout()
                    localStorage.clear()
                    window.location.reload()
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="flex flex-col items-center text-center space-y-4">
              {/* ✅ Bigger logo inside modal */}
              <img src={logo} alt="logo" className="w-[140px]" /> {/* larger width */}
              <h2 className="font-bold text-lg">Sign In to explore your AI trip planner</h2>
              <p>Sign in securely with Google authentication.</p>
              <Button
                onClick={login}
                className="w-full mt-2 flex gap-4 items-center justify-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign in With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header

