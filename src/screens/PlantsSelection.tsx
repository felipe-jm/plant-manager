import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { EnvironmentButton } from "../components/EnvironmentButton";

import { Header } from "../components/Header";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { Loading } from "../components/Loading";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { api } from "../services/api";

type Environment = {
  key: string;
  title: string;
};

type Plant = {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  };
};

export const PlantsSelection = () => {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);

  const [loading, setLoading] = useState(true);

  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);

  const [enviromentSelected, setEnviromentSelected] = useState("all");

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api.get<Environment[]>("plants_environments", {
        params: {
          _sort: "title",
          _order: "asc",
        },
      });

      const allOption = {
        key: "all",
        title: "Todos",
      };

      data.unshift(allOption);

      setEnvironments(data);
    }

    fetchEnviroment();
  }, []);

  async function fetchPlants() {
    const { data } = await api.get<Plant[]>("plants", {
      params: {
        _sort: "name",
        _order: "asc",
        _page: page,
        _limit: 8,
      },
    });

    if (!data) {
      return setLoading(true);
    }

    if (page > 1) {
      setPlants((oldPlants) => [...oldPlants, ...data]);
      setFilteredPlants((oldPlants) => [...oldPlants, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  useEffect(() => {
    fetchPlants();
  }, []);

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage(page + 1);
    fetchPlants();
  }

  function handleEnvironmentSelect(environment: string) {
    setEnviromentSelected(environment);

    if (environment === "all") {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={environments}
          keyExtractor={(enviroment) => String(enviroment.key)}
          renderItem={({ item: enviroment }) => (
            <EnvironmentButton
              title={enviroment.title}
              active={enviroment.key === enviromentSelected}
              onPress={() => handleEnvironmentSelect(enviroment.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(plant) => String(plant.id)}
          renderItem={({ item: plant }) => <PlantCardPrimary plant={plant} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : null
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 30,
    paddingTop: 40,
  },

  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },

  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },

  environmentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },

  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});
