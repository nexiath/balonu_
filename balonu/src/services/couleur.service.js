import axiosMarche from './axios.service';

const getCouleurs = async () => {
  const response = await axiosMarche.get('/couleurs');
  return response.data;
};

export default {
  getCouleurs
};
