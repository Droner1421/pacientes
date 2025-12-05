import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, RefreshControl } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { PatientDrawerParams } from "../navigator/PatientDrawerNavigator";
import { usePacienteCompleto } from "../hooks/usePacientesData";

type Props = DrawerScreenProps<PatientDrawerParams, 'InformacionPaciente'>;

export const PacienteHomeScreen = ({ route }: Props) => {
    const { paciente: pacienteInitial } = route.params;
    const { paciente, isLoading, loadPacienteData } = usePacienteCompleto();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (pacienteInitial?.id_paciente) {
            loadPacienteData(pacienteInitial.id_paciente);
        }
    }, [pacienteInitial?.id_paciente]);

    const onRefresh = async () => {
        setRefreshing(true);
        if (pacienteInitial?.id_paciente) {
            await loadPacienteData(pacienteInitial.id_paciente);
        }
        setRefreshing(false);
    };

    if (isLoading) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size={60} color="#7C3AED" />
            </View>
        );
    }

    const p = paciente || pacienteInitial;
    const sexoText = p.sexo === 'M' ? 'Masculino' : p.sexo === 'F' ? 'Femenino' : 'N/A';

    return (
        <ScrollView
            style={style.root}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="#7C3AED"
                    colors={["#7C3AED"]}
                    progressBackgroundColor="#F9F7FF"
                />
            }
        >
           
            <View style={style.avatarSection}>
                <View style={style.avatarCircle}>
                    <Text style={style.avatarText}>
                        {p.nombre?.[0]}{p.apellido?.[0]}
                    </Text>
                </View>
                <Text style={style.fullName}>{p.nombre} {p.apellido}</Text>
                <View style={[style.statusBadge, p.activo ? style.statusActive : style.statusInactive]}>
                    <Text style={style.statusText}>{p.activo ? "Activo" : "Inactivo"}</Text>
                </View>
            </View>

            
            <View style={style.gridContainer}>
                <View style={style.healthCard}>
                    <Text style={style.healthLabel}>Tipo Sangre</Text>
                    <Text style={style.healthValue}>{p.tipo_sangre || "N/A"}</Text>
                </View>
                <View style={style.healthCard}>
                    <Text style={style.healthLabel}>Edad</Text>
                    <Text style={style.healthValue}>{p.fecha_nacimiento ? "25 años" : "N/A"}</Text>
                </View>
            </View>

            <View style={style.gridContainer}>
                <View style={style.healthCard}>
                    <Text style={style.healthLabel}>Sexo</Text>
                    <Text style={style.healthValue}>{sexoText}</Text>
                </View>
                <View style={style.healthCard}>
                    <Text style={style.healthLabel}>ID</Text>
                    <Text style={style.healthValue}>{p.id_paciente}</Text>
                </View>
            </View>

            {/* PERSONAL INFO SECTION */}
            <View style={style.infoSection}>
                <Text style={style.sectionHeader}>Información Personal</Text>
                
                <View style={style.infoCard}>
                    <View style={style.infoHeader}>
                        <Text style={style.infoTitle}>Fecha de Nacimiento</Text>
                    </View>
                    <Text style={style.infoContent}>{p.fecha_nacimiento || "No registrada"}</Text>
                </View>

                <View style={style.infoCard}>
                    <View style={style.infoHeader}>
                        <Text style={style.infoTitle}>Teléfono</Text>
                    </View>
                    <Text style={style.infoContent}>{p.telefono || "No registrado"}</Text>
                </View>

                <View style={style.infoCard}>
                    <View style={style.infoHeader}>
                        <Text style={style.infoTitle}>Dirección</Text>
                    </View>
                    <Text style={style.infoContent}>{p.direccion || "No registrada"}</Text>
                </View>
            </View>

            {/* MEDICAL INFO SECTION */}
            <View style={style.infoSection}>
                <Text style={style.sectionHeader}>Información Médica</Text>
                
                <View style={style.infoCard}>
                    <View style={style.infoHeader}>
                        <Text style={style.infoTitle}>Alergias</Text>
                    </View>
                    <Text style={style.infoContent}>{p.alergias || "Sin alergias conocidas"}</Text>
                </View>
            </View>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F9F7FF',
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F7FF',
    },
    // AVATAR SECTION
    avatarSection: {
        alignItems: 'center',
        marginBottom: 28,
        paddingVertical: 20,
    },
    avatarCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#7C3AED',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    fullName: {
        fontSize: 26,
        fontWeight: '800',
        color: '#1F2937',
        marginBottom: 10,
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    statusBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    statusActive: {
        backgroundColor: '#D1FAE5',
    },
    statusInactive: {
        backgroundColor: '#FEE2E2',
    },
    statusText: {
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 0.3,
    },

    // HEALTH STATS GRID
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 12,
    },
    healthCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 4,
        borderLeftColor: '#7C3AED',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    healthLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6B7280',
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: 0.4,
    },
    healthValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#7C3AED',
    },

    // INFO SECTIONS
    infoSection: {
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1F2937',
        marginBottom: 14,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        borderTopWidth: 3,
        borderTopColor: '#EC4899',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 1,
    },
    infoHeader: {
        marginBottom: 8,
    },
    infoTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 0.3,
    },
    infoContent: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1F2937',
        lineHeight: 22,
    },

    // LEGACY STYLES (KEPT FOR COMPATIBILITY)
    headerCard: {
        backgroundColor: '#7C3AED',
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8,
    },
    nombreCompleto: {
        fontSize: 26,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 12,
        letterSpacing: 0.3
    },
    estado: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        alignSelf: 'flex-start',
        overflow: 'hidden',
        letterSpacing: 0.2
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        marginBottom: 18,
        borderLeftWidth: 5,
        borderLeftColor: '#7C3AED',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1F2937',
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.6,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    detailCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#7C3AED',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#6B7280',
        flex: 1,
        letterSpacing: 0.2
    },
    value: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
        flex: 1,
        textAlign: 'right',
    },
    bloodType: {
        color: '#7C3AED',
        fontWeight: '800',
        backgroundColor: '#F0EDFF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-end',
        overflow: 'hidden'
    },
});
