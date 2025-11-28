import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Keyboard,
  SafeAreaView, 
  StatusBar,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Definição dos tipos de dados do clima
interface WeatherData {
  city: string;
  region: string;
  country: string;
  temp: number;
  code: number;
  wind: number;
}

// Definição dos tipos para o estilo (ícone e cor)
interface WeatherStyle {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  label: string;
}

export default function HomeScreen() {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchWeather = async () => {
    const cleanCity = city.trim();
    if (!cleanCity) return;

    Keyboard.dismiss();
    setLoading(true);
    setWeather(null);
    setErrorMsg(null);

    try {
      // Encode garante que cidades com acento ou espaço funcionem na URL
      const encodedCity = encodeURIComponent(cleanCity);

      // 1. Busca Latitude e Longitude
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodedCity}&count=1&language=pt&format=json`
      );
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('Cidade não encontrada! Verifique o nome.');
      }

      const { latitude, longitude, name, admin1, country } = geoData.results[0];

      // 2. Busca os dados do tempo
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherResponse.json();

      setWeather({
        city: name,
        region: admin1,
        country: country,
        temp: weatherData.current_weather.temperature,
        code: weatherData.current_weather.weathercode,
        wind: weatherData.current_weather.windspeed
      });
      
      // Limpa o input visualmente para ficar igual ao pesquisado
      setCity(cleanCity); 

    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('Ops! Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper para decidir qual ícone mostrar
  const getWeatherStyle = (code: number): WeatherStyle => {
    // Azul #007AFF é a cor primária do app agora
    if (code === 0) return { icon: 'sunny', color: '#FFD700', label: 'Ensolarado' };
    if ([1, 2, 3].includes(code)) return { icon: 'partly-sunny', color: '#A9A9A9', label: 'Nublado' };
    if ([51, 61, 80].includes(code)) return { icon: 'rainy', color: '#4682B4', label: 'Chuvoso' };
    if ([95, 96, 99].includes(code)) return { icon: 'thunderstorm', color: '#8A2BE2', label: 'Tempestade' };
    return { icon: 'cloud', color: '#7f8c8d', label: 'Variável' };
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f6fa" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Título Atualizado e Azul */}
          <Text style={styles.title}>Clima<Text style={styles.titleBold}>Agora</Text></Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Busque sua cidade (ex: Maricá)" 
              value={city}
              onChangeText={setCity}
              placeholderTextColor="#999"
              returnKeyType="search"
              onSubmitEditing={fetchWeather}
            />
            <TouchableOpacity style={styles.button} onPress={fetchWeather} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Ionicons name="search" size={24} color="#FFF" />
              )}
            </TouchableOpacity>
          </View>

          {errorMsg && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={20} color="#e74c3c" />
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          )}

          {weather && (
            <View style={styles.card}>
              <Text style={styles.cityName}>{weather.city}</Text>
              <Text style={styles.regionName}>{weather.region} - {weather.country}</Text>
              
              <View style={styles.weatherInfo}>
                <Ionicons 
                  name={getWeatherStyle(weather.code).icon} 
                  size={80} 
                  color={getWeatherStyle(weather.code).color} 
                />
                <Text style={styles.temp}>{weather.temp}°C</Text>
              </View>
              
              <Text style={styles.description}>{getWeatherStyle(weather.code).label}</Text>
              
              <View style={styles.footerInfo}>
                <Ionicons name="filter" size={16} color="#555" />
                <Text style={styles.footerText}>Vento: {weather.wind} km/h</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa', // Fundo cinza bem claro
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    color: '#2c3e50',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 20,
  },
  titleBold: {
    fontWeight: 'bold',
    color: '#007AFF', // AZUL PROFISSIONAL (Estilo iOS)
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007AFF', // Botão acompanhando a cor do tema
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    borderRadius: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  regionName: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  weatherInfo: {
    alignItems: 'center',
    marginVertical: 10,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
  },
  description: {
    fontSize: 20,
    color: '#7f8c8d',
    marginBottom: 20,
    fontWeight: '500',
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    borderRadius: 8,
  },
  footerText: {
    marginLeft: 5,
    color: '#555',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fadbd8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#c0392b',
    marginLeft: 10,
  },
});