import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { usePacienteCompleto } from "../hooks/usePacientesData";
import { PacientesActivos } from "../interfaces/pacientesInterface";

type Props = any;

export const PacienteDetailScreen = ({ route, navigation }: Props) => {
    const { paciente: pacienteInitial } = route.params;
    const { paciente, isLoading, loadPacienteData } = usePacienteCompleto();

    useEffect(() => {
        loadPacienteData(pacienteInitial.id_paciente);
    }, [pacienteInitial.id_paciente]);

    if (isLoading) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size={60} color="#3B82F6" />
            </View>
        );
    }

    const p = paciente || pacienteInitial;

    const handleGoToReports = () => {
        navigation.navigate('PatientReportes', { paciente: p as PacientesActivos });
    };

    return (
        <ScrollView style={style.root} showsVerticalScrollIndicator={false}>
            <View style={style.headerCard}>
                <Text style={style.nombreCompleto}>
                    {p.nombre} {p.apellido}
                </Text>
                <Text style={style.estado}>
                    {p.activo ? "Activo" : "Inactivo"}
                </Text>
            </View>

            <View style={style.section}>
                <Text style={style.sectionTitle}>Datos Personales</Text>
                
                <View style={style.detailCard}>
                    <Text style={style.label}>ID Paciente</Text>
                    <Text style={style.value}>{p.id_paciente}</Text>
                </View>

                <View style={style.detailCard}>
                    <Text style={style.label}>Fecha Nacimiento</Text>
                    <Text style={style.value}>{p.fecha_nacimiento || "N/A"}</Text>
                </View>

                <View style={style.detailCard}>
                    <Text style={style.label}>Sexo</Text>
                    <Text style={style.value}>{p.sexo === 'M' ? 'Masculino' : p.sexo === 'F' ? 'Femenino' : 'N/A'}</Text>
                </View>

                <View style={style.detailCard}>
                    <Text style={style.label}>Teléfono</Text>
                    <Text style={style.value}>{p.telefono || "N/A"}</Text>
                </View>

                <View style={style.detailCard}>
                    <Text style={style.label}>Dirección</Text>
                    <Text style={style.value}>{p.direccion || "N/A"}</Text>
                </View>
            </View>

            <View style={style.section}>
                <Text style={style.sectionTitle}>Información Médica</Text>

                <View style={style.detailCard}>
                    <Text style={style.label}>Tipo de Sangre</Text>
                    <Text style={[style.value, style.bloodType]}>{p.tipo_sangre || "N/A"}</Text>
                </View>

                <View style={style.detailCard}>
                    <Text style={style.label}>Alergias</Text>
                    <Text style={style.value}>{p.alergias || "Sin alergias conocidas"}</Text>
                </View>
            </View>

            <TouchableOpacity 
                style={style.reportButton}
                onPress={handleGoToReports}
                activeOpacity={0.8}
            >
                <Text style={style.reportButtonText}>Ver Reportes del Paciente</Text>
            </TouchableOpacity>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F9F7FF',
        paddingHorizontal: 16,
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F7FF',
    },
    headerCard: {
        background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
        backgroundColor: '#7C3AED',
        borderRadius: 24,
        padding: 28,
        marginVertical: 24,
        alignItems: 'center',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },
    nombreCompleto: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 14,
        letterSpacing: 0.5,
        textAlign: 'center'
    },
    estado: {
        fontSize: 14,
        fontWeight: '800',
        color: '#FFFFFF',
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 14,
        overflow: 'hidden',
        letterSpacing: 0.3
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1F2937',
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        paddingLeft: 4,
    },
    detailCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 6,
        borderLeftColor: '#7C3AED',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    label: {
        fontSize: 13,
        fontWeight: '800',
        color: '#7C3AED',
        letterSpacing: 0.4,
        textTransform: 'uppercase',
    },
    value: {
        fontSize: 14,
        color: '#1F2937',
        fontWeight: '600',
        textAlign: 'right',
        flex: 1,
        marginLeft: 12,
    },
    bloodType: {
        backgroundColor: '#F0EDFF',
        color: '#7C3AED',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        overflow: 'hidden',
        fontWeight: '800',
        textAlign: 'center',
        alignSelf: 'flex-end'
    },
    reportButton: {
        backgroundColor: '#EC4899',
        borderRadius: 18,
        paddingVertical: 18,
        paddingHorizontal: 28,
        marginHorizontal: 12,
        marginVertical: 24,
        alignItems: 'center',
        shadowColor: '#EC4899',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 6,
    },
    reportButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});
