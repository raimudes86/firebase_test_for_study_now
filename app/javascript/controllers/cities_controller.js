// app/javascript/controllers/cities_controller.js
import { Controller } from "stimulus";
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore"; 
import { getFirebaseStore } from "../firebase";

export default class extends Controller {
  static targets = ["output"];

  connect() {
    this.loadCityData();
  }

  loadCityData() {
    const db = getFirebaseStore();
    const docRef = doc(db, "firebase_app", "user1");

    // リアルタイムのデータ監視を設定
    onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        this.outputTarget.textContent = `Name: ${data.name}, isStudy: ${data.is_study} Age: ${data.age}`;
      } else {
        console.log("No document found");
      }
    }, (error) => {
      this.outputTarget.textContent = `Error getting realtime document: ${error}`;
    });
  }

  async updateStudyFlag(event) {
    event.preventDefault();

    const db = getFirebaseStore();
    const docRef = doc(db, "firebase_app", "user1");

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const newIsStudy = 0; // フラグをトグル
        await updateDoc(docRef, { is_study: newIsStudy });
      } else {
        console.log("No");
      }
    } catch (e) {
      console.log("error", e);
    }
  }
}