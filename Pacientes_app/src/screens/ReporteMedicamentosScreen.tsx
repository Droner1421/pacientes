import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, TextInput, FlatList } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { PatientDrawerParams } from "../navigator/PatientDrawerNavigator";
import { useMedicamentosPaciente } from "../hooks/usePacientesData";

type Props = DrawerScreenProps<PatientDrawerParams, 'Medicamentos'>;

export const ReporteMedicamentosScreen = ({ route }: Props) => {
    const { paciente } = route.params as { paciente: any };
    const { medicamentos, isLoading, loadMedicamentos } = useMedicamentosPaciente();
    const [filtro, setFiltro] = useState("");

    const handleLoadData = () => {
        if (paciente?.id_paciente) {
            loadMedicamentos(paciente.id_paciente);
        }
    };

    useEffect(() => {
        handleLoadData();
    }, [paciente?.id_paciente]);

    const medicamentosFiltrados = medicamentos?.filter((med: any) => 
        med.medicamento?.toLowerCase().includes(filtro.toLowerCase())
    ) || [];

    const renderHeader = () => (
        <>
            <View style={style.filterContainer}>
                <TextInput
                    style={style.input}
                    placeholder="Buscar medicamento..."
                    value={filtro}
                    onChangeText={setFiltro}
                />
            </View>

            {medicamentosFiltrados && medicamentosFiltrados.length > 0 && (
                <View style={style.dataContainer}>
                    <View style={style.card}>
                        <Text style={style.label}>Total Medicamentos:</Text>
                        <Text style={style.value}>{medicamentosFiltrados.length}</Text>
                    </View>
                </View>
            )}
        </>
    );

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
                style={style.content}
                data={medicamentosFiltrados}
                keyExtractor={(item, index) => `${item.id_medicamento}-${index}`}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    !isLoading && (
                        <View style={style.emptyContainer}>
                            <Text style={style.emptyText}>No hay medicamentos disponibles</Text>
                        </View>
                    )
                }
                renderItem={({ item }) => (
                    <View style={style.card}>
                        <View style={style.row}>
                            <Text style={style.label}>Medicamento:</Text>
                            <Text style={style.value}>{item.medicamento}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Dosis:</Text>
                            <Text style={[style.value, { color: "#7C3AED" }]}>{item.dosis}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Frecuencia:</Text>
                            <Text style={style.value}>{item.frecuencia}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Inicio:</Text>
                            <Text style={[style.value, { color: "#EC4899" }]}>{item.fecha_inicio}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Fin:</Text>
                            <Text style={[style.value, { color: "#EC4899" }]}>{item.fecha_fin}</Text>
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
    content: {
        paddingHorizontal: 0,
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F7FF',
    },
    filterContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#7C3AED',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 14,
        color: '#1F2937',
        borderWidth: 0,
        fontWeight: '600',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    dataContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginBottom: 8,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginHorizontal: 20,
        marginVertical: 12,
        paddingHorizontal: 18,
        paddingVertical: 16,
        borderLeftWidth: 6,
        borderLeftColor: '#7C3AED',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        alignItems: 'center',
        paddingVertical: 4,
    },
    label: {
        fontSize: 11,
        fontWeight: '800',
        color: '#7C3AED',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    value: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1F2937',
        flex: 1,
        textAlign: 'right',
        marginLeft: 12,
    },
    emptyContainer: {
        marginVertical: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#9CA3AF',
        fontStyle: 'italic',
        fontWeight: '600',
    },
});
