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

      <!-- Album Creation Section -->
      <div class="new-album">
        <h4>Create New Album</h4>

        <input v-model="albumData.title" type="text" placeholder="Album Title" />
        <input v-model="albumData.releaseDate" type="date" />

        <label>Album Cover:</label>
        <input type="file" @change="onAlbumCoverChange" accept="image/*" />

        <button type="button" @click="createAlbum">Add Album</button>
      </div>
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
      },
      albumData: {
        title: '',
        releaseDate: '',
        cover: null
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
    onAlbumCoverChange(e) {
      this.albumData.cover = e.target.files[0];
    },
    async createAlbum() {
      if (!this.albumData.title) return;

      const formData = new FormData();
      formData.append('title', this.albumData.title);
      if (this.albumData.releaseDate) formData.append('releaseDate', this.albumData.releaseDate);
      if (this.albumData.cover) formData.append('cover', this.albumData.cover);

      try {
        const res = await fetch('http://localhost:5000/api/albums', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.store.token}`
          },
          body: formData
        });

        if (!res.ok) throw new Error('Album creation failed');

        const newAlbum = await res.json();
        this.musicStore.albums.push(newAlbum);
        this.songData.albumId = newAlbum._id;
        this.albumData = { title: '', releaseDate: '', cover: null };

        this.store.showSnackbar({
          message: 'Album created!',
          submessage: `Added "${newAlbum.title}" to album list.`,
          color: 'green'
        });
      } catch (err) {
        this.store.showSnackbar({
          message: 'Failed to create album',
          submessage: err.message,
          color: 'red'
        });
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

  .new-album {
    border: 1px dashed var(--green3);
    padding: 1rem;
    border-radius: 6px;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    background-color: rgba(0, 128, 0, 0.1);

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h4 {
      margin-bottom: 0.5rem;
      color: var(--green3);
    }

    input[type="text"],
    input[type="date"],
    input[type="file"] {
      padding: 0.5rem;
      border-radius: 4px;
    }

    button {
      align-self: flex-start;
      margin-top: 0.5rem;
      background-color: var(--green3);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-radius: 4px;
    }
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
