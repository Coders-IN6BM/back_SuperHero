import axios from 'axios';
import https from 'https';

const agent = new https.Agent({ rejectUnauthorized: false });
const axiosInstance = axios.create({ httpsAgent: agent });
 
export const getAllSuperheroes = async (req, res) => {
    try {
    const response = await axiosInstance.get('https://akabab.github.io/superhero-api/api/all.json');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todos los superhéroes'});
  }
};

export const getSuperheroById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const response = await axiosInstance.get(`https://akabab.github.io/superhero-api/api/id/${id}.json`);
    
    const heroData = {
      id: response.data.id,
      name: response.data.name,
      biography: {
        fullName: response.data.biography.fullName,
        publisher: response.data.biography.publisher
      },
      image: response.data.images.md,
      stats: response.data.powerstats
    };

    res.json({
      success: true,
      data: heroData,
      metadata: {
        source: 'SuperHero API',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ 
        success: false,
        error: 'Superhéroe no encontrado',
      });
    } else {
      res.status(500).json({ 
        success: false,
        error: 'Error en el servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};
