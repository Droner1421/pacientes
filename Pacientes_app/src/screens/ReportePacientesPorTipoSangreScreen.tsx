import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, TextInput, FlatList } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { ReportesDrawerParams } from "../navigator/ReportesNavigatorPacientes";
import { usePacientesPorTipoSangre } from "../hooks/usePacientesData";

type Props = DrawerScreenProps<ReportesDrawerParams, 'ReporteCitas'>;

export const ReportePacientesPorTipoSangreScreen = () => {
    const [tipoSangre, setTipoSangre] = useState("O+");
    const { data, isLoading, loadData } = usePacientesPorTipoSangre();

    const handleSearch = () => {
        if (tipoSangre.trim()) {
            loadData(tipoSangre);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    if (isLoading) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size={60} color="#7C3AED" />
            </View>
        );
    }

    return (
        <View style={style.root}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => `${item.id_paciente}-${index}`}
                ListHeaderComponent={
                    <View>
                        <View style={style.searchContainer}>
                            <TextInput
                                style={style.input}
                                placeholder="Tipo de sangre (ej: O+)..."
                                value={tipoSangre}
                                onChangeText={setTipoSangre}
                            />
                        </View>
                        {data && data.length > 0 && (
                            <View style={style.dataContainer}>
                                <View style={style.card}>
                                    <Text style={style.label}>Total Pacientes:</Text>
                                    <Text style={style.value}>{data.length}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                }
                ListEmptyComponent={
                    !isLoading && (
                        <View style={style.emptyContainer}>
                            <Text style={style.emptyText}>No hay pacientes con este tipo de sangre</Text>
                        </View>
                    )
                }
                renderItem={({ item }) => (
                    <View style={style.card}>
                        <View style={style.row}>
                            <Text style={style.label}>Nombre:</Text>
                            <Text style={style.value}>{item.nombre} {item.apellido}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Tipo Sangre:</Text>
                            <Text style={[style.value, { color: "#7C3AED" }]}>{item.tipo_sangre}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Teléfono:</Text>
                            <Text style={style.value}>{item.telefono}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Estado:</Text>
                            <Text style={[style.value, { color: item.activo ? "#10B981" : "#EC4899" }]}>
                                {item.activo ? "Activo" : "Inactivo"}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F9F7FF',
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F7FF',
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 2,
        borderBottomColor: '#E9D5FF',
    },
    input: {
        backgroundColor: '#F9F7FF',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        color: '#1F2937',
        borderWidth: 2,
        borderColor: '#E9D5FF',
        fontWeight: '500',
    },
    dataContainer: {
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        marginHorizontal: 16,
        marginVertical: 10,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderLeftWidth: 5,
        borderLeftColor: '#7C3AED',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        fontWeight: '800',
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 0.4,
    },
    value: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1F2937',
        flex: 1,
        textAlign: 'right',
    },
    emptyContainer: {
        marginVertical: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: '#9CA3AF',
        fontStyle: 'italic',
        fontWeight: '500',
    },
});
