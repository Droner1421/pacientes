import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, TextInput, ActivityIndicator } from "react-native";
import { usePacientesPorTipoSangre } from "../hooks/usePacientesData";
import { PacientesActivos } from "../interfaces/pacientesInterface";

export const HomePacientesPorTipoSangreScreen = () => {
    const { pacientes, isLoading, loadPacientes } = usePacientesPorTipoSangre();
    const [tipoSangre, setTipoSangre] = useState<string>("");
    const [searched, setSearched] = useState<boolean>(false);

    const handleSearch = () => {
        if (tipoSangre.trim()) {
            setSearched(true);
            loadPacientes(tipoSangre);
        }
    };

    return (
        <View style={style.root}>
            <View style={style.searchContainer}>
                <TextInput
                    style={style.input}
                    placeholder="Ej: O+, A-, B+, AB"
                    placeholderTextColor="#9CA3AF"
                    value={tipoSangre}
                    onChangeText={setTipoSangre}
                />
                <View style={style.buttonContainer}>
                    <Text 
                        style={style.button}
                        onPress={handleSearch}
                    >
                        Buscar
                    </Text>
                </View>
            </View>

            {isLoading ? (
                <View style={style.containerLoading}>
                    <ActivityIndicator size={60} color="#7C3AED" />
                </View>
            ) : searched && pacientes.length === 0 ? (
                <View style={style.emptyContainer}>
                    <Text style={style.emptyText}>No se encontraron pacientes</Text>
                </View>
            ) : (
                <FlatList
                    data={pacientes}
                    keyExtractor={(item) => `${item.id_paciente}`}
                    renderItem={({ item }) => (
                        <View style={style.card}>
                            <Text style={style.nombre}>
                                {item.nombre} {item.apellido}
                            </Text>
                            <Text style={style.detail}>
                                Tipo de sangre: <Text style={style.detailValue}>{item.tipo_sangre}</Text>
                            </Text>
                            <Text style={style.detail}>
                                Teléfono: <Text style={style.detailValue}>{item.telefono || "N/A"}</Text>
                            </Text>
                            <Text style={[style.detail, { marginBottom: 0 }]}>
                                Estado: <Text style={[style.detailValue, { color: item.activo ? '#10B981' : '#EF4444' }]}>
                                    {item.activo ? 'Activo' : 'Inactivo'}
                                </Text>
                            </Text>
                        </View>
                    )}
                    contentContainerStyle={style.listContent}
                    scrollEnabled={true}
                />
            )}
        </View>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F9F7FF',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 10,
    },
    input: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#E9D5FF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 14,
        backgroundColor: '#FFFFFF',
        color: '#1F2937',
        fontWeight: '500',
    },
    buttonContainer: {
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#7C3AED',
        color: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        fontWeight: '800',
        fontSize: 14,
        overflow: 'hidden',
        textAlign: 'center',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#9CA3AF',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 18,
        marginBottom: 14,
        borderLeftWidth: 5,
        borderLeftColor: '#7C3AED',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 3,
    },
    nombre: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1F2937',
        marginBottom: 10,
        letterSpacing: 0.3
    },
    detail: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 8,
        fontWeight: '500'
    },
    detailValue: {
        fontWeight: '700',
        color: '#1F2937',
    },
    listContent: {
        paddingBottom: 20,
    },
});
