import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, TextInput, FlatList } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { PatientDrawerParams } from "../navigator/PatientDrawerNavigator";
import { useTratamientosPorDiagnostico } from "../hooks/usePacientesData";

type Props = DrawerScreenProps<PatientDrawerParams, 'Tratamientos'>;

export const ReporteTratamientosScreen = ({ route }: Props) => {
    const [diagnostico, setDiagnostico] = useState("Hipertensión");
    const { tratamientos, isLoading, loadTratamientos } = useTratamientosPorDiagnostico();

    const handleSearch = () => {
        if (diagnostico.trim()) {
            loadTratamientos(diagnostico);
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
                data={tratamientos}
                keyExtractor={(item, index) => `${item.id_tratamiento}-${index}`}
                ListHeaderComponent={
                    <View>
                        <View style={style.searchContainer}>
                            <TextInput
                                style={style.input}
                                placeholder="Diagnóstico..."
                                value={diagnostico}
                                onChangeText={setDiagnostico}
                            />
                        </View>
                        {tratamientos && tratamientos.length > 0 && (
                            <View style={style.dataContainer}>
                                <View style={style.card}>
                                    <Text style={style.label}>Total Tratamientos:</Text>
                                    <Text style={style.value}>{tratamientos.length}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                }
                ListEmptyComponent={
                    !isLoading && (
                        <View style={style.emptyContainer}>
                            <Text style={style.emptyText}>No hay tratamientos disponibles</Text>
                        </View>
                    )
                }
                renderItem={({ item }) => (
                    <View style={style.card}>
                        <View style={style.row}>
                            <Text style={style.label}>Diagnóstico:</Text>
                            <Text style={style.value}>{item.diagnostico}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Medicamento:</Text>
                            <Text style={style.value}>{item.medicamento}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Dosis:</Text>
                            <Text style={[style.value, { color: "#7C3AED" }]}>{item.dosis}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Inicio:</Text>
                            <Text style={style.value}>{item.fecha_inicio}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Fin:</Text>
                            <Text style={style.value}>{item.fecha_fin}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Notas:</Text>
                            <Text style={style.value}>{item.notas}</Text>
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
