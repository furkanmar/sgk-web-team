<template>
  <div class="login-page">
    <img src="@/assets/cs-logo.png" alt="CS Logo" class="mb-2" style="width: 400px; height: auto;">
    
    <div class="login-container">
      <h1>Hoş Geldiniz</h1>
      <p v-if="login">Lütfen hesabınıza giriş yapın</p>
      <p v-else>Yeni bir hesap oluşturun</p>
      
      <div v-show="login">
        <form @submit.prevent="handleLogin">
          <div class="input-container">
            <input type="email" v-model="email" placeholder=" " required />
            <label>Email</label>
          </div>
          <div class="input-container">
            <input type="password" v-model="password" placeholder=" " required />
            <label>Şifre</label>
          </div>
          <button type="submit" :disabled="loading">
            <span v-if="!loading">Giriş Yap</span>
            <span v-else>Giriş Yapılıyor...</span>
          </button>
          <div class="link-container">
            <a href="#" @click.prevent="forgotPassword">Şifremi Unuttum</a>
            <a href="#" @click.prevent="toggleLoginStatus">Üye Değil misiniz?</a>
          </div>
        </form>
      </div>

      <div v-show="!login">
        <form @submit.prevent="handleRegister">
          <div class="input-container">
            <input type="email" v-model="email" placeholder=" " required />
            <label>Email</label>
          </div>
          <div class="input-container">
            <input type="password" v-model="password" placeholder=" " required />
            <label>Şifre</label>
          </div>
          <div class="input-container">
            <input type="password" v-model="confirmPassword" placeholder=" " required />
            <label>Şifreyi tekrar giriniz</label>
          </div>
          <button type="submit" :disabled="loading">
            <span v-if="!loading">Kayıt Ol</span>
            <span v-else>Kayıt Olunuyor...</span>
          </button>
          <a href="#" @click.prevent="toggleLoginStatus">Geri dön</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      login: true,
    };
  },
  methods: {
    handleLogin() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.email === this.email && user.password === this.password);
        if (user) {
          this.$emit("log", this.email);
        } else {
          alert("Hatalı email veya şifre.");
        }
      }, 1000);
    },
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert("Şifreler eşleşmiyor.");
        return;
      }
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find(user => user.email === this.email);
      if (existingUser) {
        alert("Bu email ile zaten bir hesap oluşturulmuş.");
        return;
      }
      users.push({ email: this.email, password: this.password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Başarıyla kayıt oldunuz!");
      this.toggleLoginStatus();
    },
    toggleLoginStatus() {
      this.login = !this.login;
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
    },
    forgotPassword() {
      alert("Şifre sıfırlama bağlantısı gönderildi.");
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #a8894c, #000111);
}

.login-container {
  background: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.link-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #333;
}

p {
  color: #666;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
}

.input-container {
  position: relative;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px 10px 10px 0;
  border: none;
  border-bottom: 2px solid #aaa;
  outline: none;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  border-bottom-color: #647dee;
}

input:focus + label,
input:not(:placeholder-shown) + label {
  top: -20px;
  font-size: 0.8rem;
  color: #647dee;
}

label {
  position: absolute;
  left: 0;
  top: 10px;
  font-size: 1rem;
  color: #aaa;
  pointer-events: none;
  transition: 0.3s ease;
}

button {
  background: #647dee;
  color: #fff;
  font-size: 1rem;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 20px;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #7f53ac;
}

a {
  color: #647dee;
  margin-top: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

a:hover {
  color: #7f53ac;
}
</style>
