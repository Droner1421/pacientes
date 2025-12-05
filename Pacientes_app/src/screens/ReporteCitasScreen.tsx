import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, TextInput, FlatList } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { PatientDrawerParams } from "../navigator/PatientDrawerNavigator";
import { useCitasPaciente } from "../hooks/usePacientesData";

type Props = DrawerScreenProps<PatientDrawerParams, 'TodasLasCitas'>;

export const ReporteCitasScreen = ({ route }: Props) => {
    const { paciente } = route.params as { paciente: any };
    const { citas, isLoading, loadCitas } = useCitasPaciente();
    const [filtro, setFiltro] = useState("");

    const handleLoadData = () => {
        if (paciente?.id_paciente) {
            loadCitas(paciente.id_paciente);
        }
    };

    useEffect(() => {
        handleLoadData();
    }, [paciente?.id_paciente]);

    if (isLoading) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size={60} color="#7C3AED" />
            </View>
        );
    }

    const renderHeader = () => (
        <>
            <View style={style.filterContainer}>
                <TextInput
                    style={style.input}
                    placeholder="Buscar cita..."
                    value={filtro}
                    onChangeText={setFiltro}
                />
            </View>

            {citas && citas.length > 0 && (
                <View style={style.dataContainer}>
                    <View style={style.card}>
                        <Text style={style.label}>Total Citas:</Text>
                        <Text style={style.value}>{citas.length}</Text>
                    </View>
                </View>
            )}
        </>
    );

    const citasFiltradas = citas?.filter((cita: any) => 
        cita.motivo?.toLowerCase().includes(filtro.toLowerCase()) ||
        cita.medico_asignado?.toLowerCase().includes(filtro.toLowerCase())
    ) || [];

    return (
        <View style={style.root}>
            <FlatList
                style={style.content}
                data={citasFiltradas}
                keyExtractor={(item, index) => `${item.id_cita}-${index}`}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    !isLoading && (
                        <View style={style.emptyContainer}>
                            <Text style={style.emptyText}>No hay citas disponibles</Text>
                        </View>
                    )
                }
                renderItem={({ item }) => (
                    <View style={style.card}>
                        <View style={style.row}>
                            <Text style={style.label}>Fecha:</Text>
                            <Text style={style.value}>{item.fecha}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Hora:</Text>
                            <Text style={[style.value, { color: "#7C3AED" }]}>{item.hora}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Motivo:</Text>
                            <Text style={style.value}>{item.motivo}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Médico:</Text>
                            <Text style={[style.value, { color: "#EC4899" }]}>{item.medico_asignado}</Text>
                        </View>
                        <View style={style.row}>
                            <Text style={style.label}>Estatus:</Text>
                            <Text style={[style.value, { color: item.estatus === "confirmada" ? "#10B981" : "#EC4899" }]}>
                                {item.estatus}
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
        fontSize: 14,
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
