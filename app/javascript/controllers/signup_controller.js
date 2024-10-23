import { Controller } from "@hotwired/stimulus"
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { firebaseConfig } from "env"

export default class extends Controller {
  static targets = ["email", "password"]
  
  initialize() {
    this.app = initializeApp(firebaseConfig)
    this.auth = getAuth(this.app)
  }

  async register(event) {
    event.preventDefault()

    const email = this.emailTarget.value
    const password = this.passwordTarget.value

    console.log("register controller")

    try {
      // Firebaseでユーザーを登録
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password)
      const uid = userCredential.user.uid

      // Railsバックエンドにユーザーを登録
      const response = await this.createUserOnBackend(uid, email)

      if (response.ok) {
        Turbo.visit("/mypage")
      } else {
        throw new Error("バックエンドでのユーザー登録に失敗しました。")
      }
    } catch (error) {
      console.error("エラー:", error)
      alert("ユーザー登録に失敗しました。")
    }
  }

  async createUserOnBackend(uid, email) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

    return await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken
      },
      body: JSON.stringify({ user: {uid: uid, email: email} })
    })
  }
}