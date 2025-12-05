import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePacientesActivos } from "../hooks/usePacientesData";
import { PacientesCard } from "../components/PacientesCard";

export const PacientesScreens = () => {
    const { pacientes, isLoading, loadPacientes } = usePacientesActivos();
    const navigation = useNavigation<any>();

    useEffect(() => {
        loadPacientes();
    }, [loadPacientes]);

    const handlePacientePress = (paciente: any) => {
      
        navigation.navigate('PacienteHome', { paciente });
    };

    return (
        <View style={style.root}>
            <FlatList
                data={pacientes}
                keyExtractor={(paciente, index) => `${paciente.id_paciente}${index}`}
                ListHeaderComponent={(
                    <View style={style.headerContainer}>
                        <View style={style.headerContent}>
                            <Text style={style.titulo}>Pacientes</Text>
                            <TouchableOpacity 
                                style={style.buttonAgregar}
                                onPress={() => navigation.navigate('CrearPaciente')}
                            >
                                <Text style={style.buttonText}>+ Agregar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handlePacientePress(item)}
                        activeOpacity={0.7}
                    >
                        <PacientesCard paciente={item} />
                    </TouchableOpacity>
                )}
                onEndReached={loadPacientes}
                onEndReachedThreshold={0.2}
                ListFooterComponent={(
                    <ActivityIndicator
                        style={{ height: 120 }}
                        size={60}
                        color="#3B82F6"
                    />
                )}
            />
        </View>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F9F7FF',
        alignItems: 'center'
    },
    headerContainer: {
        paddingVertical: 24,
        paddingHorizontal: 20,
        backgroundColor: '#7C3AED',
        marginBottom: 24,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        width: '100%',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 0.3
    },
    buttonAgregar: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3
    },
    buttonText: {
        color: '#7C3AED',
        fontWeight: '700',
        fontSize: 13,
        letterSpacing: 0.3
    }
});
