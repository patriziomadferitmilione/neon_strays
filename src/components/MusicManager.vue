<template>
  <div class="music-manager">
    <h2>Manage Songs</h2>

    <!-- Upload Form -->
    <form @submit.prevent="handleUpload" class="upload-form">
      <input v-model="songData.title" type="text" placeholder="Title" required />
      <input v-model="songData.artist" type="text" placeholder="Artist" />

      <label>Assign to Album:</label>
      <select v-model="songData.albumId">
        <option disabled value="">-- Select Album --</option>
        <option v-for="album in musicStore.albums" :key="album._id" :value="album._id">
          {{ album.title }}
        </option>
      </select>

      <div class="new-album">
        <input v-model="albumData.title" type="text" placeholder="New Album Title" />
        <input v-model="albumData.releaseDate" type="date" />
        <button type="button" @click="createAlbum">Create Album</button>
      </div>

      <label>Access:</label>
      <select v-model="songData.access">
        <option value="free">Free</option>
        <option value="paid">Paid</option>
      </select>

      <label>Release Date:</label>
      <input v-model="songData.releaseDate" type="date" />

      <label>Cover Art (optional):</label>
      <input type="file" @change="onFileChange($event, 'cover')" accept="image/*" />

      <label>Upload MP3 (required):</label>
      <input type="file" @change="onFileChange($event, 'mp3')" accept="audio/mp3" required />

      <label>Upload AAC (optional):</label>
      <input type="file" @change="onFileChange($event, 'aac')" accept="audio/aac,audio/mp4" />

      <label>Upload WAV (optional):</label>
      <input type="file" @change="onFileChange($event, 'wav')" accept="audio/wav" />

      <button type="submit">Upload Song</button>
      <p v-if="songData.status" class="status">{{ songData.status }}</p>
    </form>

    <!-- Song List -->
    <ul class="uploaded-songs" v-if="musicStore.songs.length">
      <li v-for="song in musicStore.songs" :key="song._id">
        🎵 {{ song.title }} — {{ song.artist || 'Neon Strays' }} ({{ song.access }})
      </li>
    </ul>
  </div>
</template>

<script>
import { useMainStore } from '../store/mainStore';
import { useMusicStore } from '../store/musicStore';

export default {
  data() {
    return {
      store: useMainStore(),
      musicStore: useMusicStore(),

      songData: {
        title: '',
        artist: '',
        albumId: '',
        access: 'free',
        releaseDate: '',
        files: {
          mp3: null,
          aac: null,
          wav: null,
          cover: null
        },
        status: ''
      },
      albumData: {
        title: '',
        releaseDate: '',
      }
    };
  },

  created() {
    this.musicStore.fetchSongs();
    this.musicStore.fetchAlbums();
  },

  methods: {
    onFileChange(e, format) {
      this.songData.files[format] = e.target.files[0];
    },
    async createAlbum() {
      if (!this.albumData.title) return;

      const newAlbum = await this.musicStore.createAlbum(this.albumData.title, this.albumData.releaseDate);
      if (newAlbum) {
        this.songData.albumId = newAlbum._id;
        this.albumData.title = '';
        this.albumData.releaseDate = '';
      }
    },
    async handleUpload() {
      const { title, artist, albumId, access, releaseDate, files } = this.songData;
      if (!files.mp3) {
        this.store.showSnackbar({
          message: 'MP3 is required',
          color: 'orange'
        });
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('artist', artist);
      formData.append('access', access);
      if (releaseDate) formData.append('releaseDate', releaseDate);
      if (albumId) formData.append('album', albumId);
      formData.append('mp3', files.mp3);
      if (files.aac) formData.append('aac', files.aac);
      if (files.wav) formData.append('wav', files.wav);
      if (files.cover) formData.append('cover', files.cover);

      try {
        const res = await fetch('http://localhost:5000/api/songs/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.store.token}`
          },
          body: formData
        });

        if (!res.ok) throw new Error('Upload failed');

        this.store.showSnackbar({
          message: 'Upload successful!',
          submessage: 'Your new track is now live.',
          color: 'green'
        });
        this.resetForm();
        await this.musicStore.fetchSongs();
      } catch (err) {
        this.store.showSnackbar({
          message: 'Upload failed',
          submessage: 'Check your file or connection.',
          color: 'red'
        });
      }
    },
    resetForm() {
      this.songData = {
        title: '',
        artist: '',
        albumId: '',
        access: 'free',
        releaseDate: '',
        files: { mp3: null, aac: null, wav: null },
        status: ''
      };
    }
  }
};
</script>

<style scoped>
.music-manager {
  padding: 2rem;
  color: white;
  background: var(--black);
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;

  input, button {
    padding: 0.6rem;
    font-size: 1rem;
    border-radius: 4px;
  }

  button {
    background: var(--green3);
    border: none;
    color: white;
    cursor: pointer;
  }

  .status {
    font-weight: bold;
  }
}

.uploaded-songs li {
  margin-bottom: 0.5rem;
}

.upload-form label {
  font-weight: bold;
  margin-top: 1rem;
  display: block;
  color: var(--green3);
}

.upload-form select,
.upload-form input[type="date"] {
  padding: 0.5rem;
  border-radius: 4px;
}
</style>
