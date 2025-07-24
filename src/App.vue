
<template>
  <div class="display">
    <h1>Neon Strays</h1>
    
    <!-- Header -->
    <header class="header">
        <nav class="nav container">
            <div class="logo">NEON STRAYS</div>
            <ul class="nav-links">
                <li><a href="#music">Music</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div class="auth-buttons">
                <button class="btn btn-secondary" id="loginBtn">Login</button>
                <button class="btn btn-primary" id="signupBtn">Sign Up</button>
                <div id="userMenu" style="display: none;">
                    <span id="welcomeUser"></span>
                    <button class="btn btn-secondary" id="logoutBtn">Logout</button>
                </div>
            </div>
        </nav>
    </header>
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>NEON STRAYS</h1>
            <p>Electronic soundscapes for the digital age</p>
            <a href="#music" class="btn btn-primary">Explore Music</a>
        </div>
    </section>

    <!-- Main Content -->
    <main class="main">
        <!-- Music Section -->
        <section id="music" class="section">
            <div class="container">
                <h2>Latest Tracks</h2>
                <div class="music-grid" id="musicGrid">
                    <!-- Tracks will be populated by JavaScript -->
                </div>

                <!-- User Library -->
                <div class="user-library" id="userLibrary">
                    <h3>Your Library</h3>
                    <div id="libraryTracks"></div>
                </div>
            </div>
        </section>

        <!-- Newsletter Section -->
        <section class="section">
            <div class="container">
                <div class="newsletter">
                    <h2>Stay in the Loop</h2>
                    <p>Get notified about new releases, exclusive content, and upcoming shows</p>
                    <form class="newsletter-form" id="newsletterForm">
                        <input type="email" placeholder="Enter your email" required>
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
        </section>
    </main>
  </div>

</template>

<script>
export default {
  data() {

  }
}
</script>


<style scoped lang="scss">
.display {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

.container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header */
        .header {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(0, 14, 14, 0.95);
            backdrop-filter: blur(10px);
            z-index: 1000;
            padding: 1rem 0;
            border-bottom: 1px solid var(--green);
        }

        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 2rem;
            font-weight: 900;
            color: var(--white);
            text-shadow: 0 0 20px var(--blue);
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .nav-links a {
            color: var(--white);
            text-decoration: none;
            font-weight: 400;
            transition: all 0.3s ease;
            position: relative;
        }

        .nav-links a:hover {
            color: var(--blue);
            text-shadow: 0 0 5px var(--blue);
        }

        .auth-buttons {
            display: flex;
            gap: 1rem;
        }

        .btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            text-align: center;
        }

        .btn-primary {
            background: linear-gradient(45deg, var(--blue), var(--blue2));
            color: var(--white);
        }

        .btn-primary:hover {
            background: linear-gradient(45deg, var(--blue2), var(--blue3));
            box-shadow: 0 5px 15px rgba(0, 107, 166, 0.4);
        }

        .btn-secondary {
            background: transparent;
            color: var(--white);
            border: 1px solid var(--green3);
        }

        .btn-secondary:hover {
            background: var(--green3);
            box-shadow: 0 5px 15px rgba(0, 102, 56, 0.4);
        }

        /* Hero Section */
        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(0, 107, 166, 0.1) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.6; }
        }

        .hero-content {
            z-index: 2;
            position: relative;
        }

        .hero h1 {
            font-size: 4rem;
            font-weight: 900;
            margin: 0;
            text-shadow: 0 0 30px var(--blue);
            background: linear-gradient(45deg, var(--white), var(--blue));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero p {
            font-size: 1.5rem;
            margin: 1rem 0 2rem;
            opacity: 0.9;
        }

        /* Main Content */
        .main {
            padding-top: 100px;
        }

        .section {
            padding: 4rem 0;
            border-bottom: 1px solid rgba(0, 61, 34, 0.3);
        }

        .section h2 {
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 3rem;
            color: var(--white);
            text-shadow: 0 0 10px var(--blue);
        }
}
</style>
