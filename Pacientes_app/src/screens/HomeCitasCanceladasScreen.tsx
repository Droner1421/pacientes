import React, { useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useCitasCanceladas } from "../hooks/usePacientesData";

export const HomeCitasCanceladasScreen = () => {
    const { total, isLoading, loadCitasCanceladas } = useCitasCanceladas();

    useEffect(() => {
        loadCitasCanceladas();
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
            <View style={style.card}>
                <Text style={style.label}>Total Citas Canceladas</Text>
                <Text style={style.bigNumber}>{total || 0}</Text>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F9F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F7FF',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: 32,
        paddingVertical: 48,
        borderLeftWidth: 6,
        borderLeftColor: '#EC4899',
        shadowColor: '#EC4899',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 5,
        alignItems: 'center',
    },
    label: {
        fontSize: 15,
        fontWeight: '800',
        color: '#6B7280',
        marginBottom: 20,
        textTransform: 'uppercase',
        letterSpacing: 0.6,
    },
    bigNumber: {
        fontSize: 56,
        fontWeight: '800',
        color: '#EC4899',
    },
});
