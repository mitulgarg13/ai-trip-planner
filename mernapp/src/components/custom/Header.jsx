import React, { useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc"
import logo from '../../assets/logo.png'

// ✅ Firebase Auth imports
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../../service/firebaseConfig" // Adjust this path if needed

function Header() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')))
  const [openDialog, setOpenDialog] = useState(false)

  // ✅ Use Firebase Auth Google provider
  const provider = new GoogleAuthProvider()

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user)
        localStorage.setItem('user', JSON.stringify(result.user))
        setUser(result.user)
        setOpenDialog(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear()
        window.location.reload()
      })
      .catch((error) => console.error(error))
  }

  return (
    <div className="shadow-sm flex justify-between items-center px-6 py-4">
      {/* ✅ Bigger header logo */}
      <img src={logo} alt="Logo" className="h-14 w-auto" />

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
                  src={user?.photoURL}
                  alt="User Profile"
                  className="h-[40px] w-[40px] rounded-full border border-gray-300 bg-gray-100"
                  onError={e => { e.target.onerror = null; e.target.src = '/placeholder.jpg'; }}
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={handleLogout}
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
              <img src={logo} alt="logo" className="w-[140px]" />
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
