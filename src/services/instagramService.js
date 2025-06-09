class InstagramService {
  async fetchMedia() {
    try {
      const response = await fetch('/api/instagram');
      if (!response.ok) throw new Error('Erro ao buscar feed do Instagram');

      const data = await response.json();

      return this._processMediaResponse(data);
    } catch (error) {
      console.error('Erro ao buscar dados da API local:', error);
      return { media: [] };
    }
  }

  _processMediaResponse(items) {
    return {
      media: items.map(item => ({
        id: item.id,
        caption: item.caption,
        mediaType: item.media_type,
        mediaUrl: item.media_url,
        permalink: item.permalink,
        timestamp: item.timestamp,
      }))
    };
  }

  getMockMedia() {
    return { media: [] };
  }

  async getLatestPosts(limit = 3) {
    const { media } = await this.fetchMedia();
    return media.filter(item => item.mediaType === 'IMAGE').slice(0, limit);
  }

  async getLatestReels(limit = 1) {
    const { media } = await this.fetchMedia();
    return media.filter(item => item.mediaType === 'VIDEO').slice(0, limit);
  }
}

const instagramService = new InstagramService();
export default instagramService;
