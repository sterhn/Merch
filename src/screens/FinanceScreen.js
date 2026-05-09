import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings, X, Check } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { ACCENTS_LIST } from '../data/mockData';

const EXPENSES = [
  { label: 'Аренда стенда',      cat: 'Взносы',       amount: '$200.00' },
  { label: 'Печать принтов',     cat: 'Производство',  amount: '$85.00'  },
  { label: 'Перевозка грузов',   cat: 'Логистика',     amount: '$140.00' },
  { label: 'Еда на мероприятии', cat: 'Еда',           amount: '$35.50'  },
  { label: 'Доп. материалы',     cat: 'Производство',  amount: '$45.00'  },
];

function SettingsModal({ visible, onClose }) {
  const { T, dark, setDark, accent, setAccent } = useTheme();
  const insets = useSafeAreaInsets();
  const cardBg = dark ? T.cardSurface : T.surface;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.settingsBg}>
        <View
          style={[
            styles.settingsSheet,
            {
              backgroundColor: dark ? '#241A38' : T.bg,
              paddingBottom: insets.bottom + 20,
            },
          ]}
        >
          <View style={styles.handleWrap}>
            <View style={[styles.handle, { backgroundColor: T.line }]} />
          </View>

          <View style={styles.settingsHeader}>
            <Text style={[styles.settingsTitle, { color: T.ink }]}>Настройки</Text>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              style={[styles.closeBtn, { backgroundColor: cardBg, borderColor: T.line }]}
            >
              <X size={18} color={T.ink} strokeWidth={2.4} />
            </TouchableOpacity>
          </View>

          {/* Theme toggle */}
          <View
            style={[styles.settingsRow, { borderColor: T.line, backgroundColor: cardBg }]}
          >
            <View>
              <Text style={[styles.rowLabel, { color: T.ink }]}>Тёмная тема</Text>
              <Text style={[styles.rowSub, { color: T.ink3 }]}>
                {dark ? 'Включена 🌙' : 'Выключена ☀️'}
              </Text>
            </View>
            <Switch
              value={dark}
              onValueChange={setDark}
              trackColor={{ false: T.line, true: T.primary }}
              thumbColor="#fff"
            />
          </View>

          {/* Accent selector */}
          <Text style={[styles.accentTitle, { color: T.ink2 }]}>Цвет акцента</Text>
          <View style={styles.accentGrid}>
            {ACCENTS_LIST.map((a) => {
              const isSel = a.key === accent;
              return (
                <TouchableOpacity
                  key={a.key}
                  onPress={() => setAccent(a.key)}
                  activeOpacity={0.7}
                  style={[
                    styles.accentItem,
                    {
                      backgroundColor: cardBg,
                      borderColor: isSel ? T.primary : T.line,
                      borderWidth: isSel ? 2 : 1.5,
                    },
                  ]}
                >
                  <View style={[styles.accentDot, { backgroundColor: a.dot }]}>
                    {isSel && <Check size={12} color="#fff" strokeWidth={3} />}
                  </View>
                  <Text style={[styles.accentLabel, { color: T.ink }]}>{a.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function FinanceScreen() {
  const { T, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const cardBg = dark ? T.cardSurface : T.surface;

  return (
    <View style={[styles.root, { backgroundColor: T.bg }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120, paddingTop: insets.top }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.subtitle, { color: T.ink2 }]}>
              история трат 💸
            </Text>
            <Text style={[styles.title, { color: T.ink }]}>Финансы</Text>
          </View>
          <TouchableOpacity
            onPress={() => setSettingsOpen(true)}
            activeOpacity={0.7}
            style={[styles.settingsBtn, { backgroundColor: cardBg, borderColor: T.line }]}
          >
            <Settings size={20} strokeWidth={2.2} color={T.ink} />
          </TouchableOpacity>
        </View>

        {/* Summary banner */}
        <View
          style={[
            styles.banner,
            { backgroundColor: T.primarySoft, borderColor: T.primaryBorder },
          ]}
        >
          <View style={styles.bannerRow}>
            <View style={styles.bannerCol}>
              <Text style={[styles.bannerLabel, { color: T.ink2 }]}>Доходы</Text>
              <Text style={[styles.bannerValue, { color: T.primary }]}>$2 140</Text>
            </View>
            <View style={[styles.bannerDivider, { backgroundColor: T.primaryBorder }]} />
            <View style={styles.bannerCol}>
              <Text style={[styles.bannerLabel, { color: T.ink2 }]}>Расходы</Text>
              <Text style={[styles.bannerValue, { color: T.coral }]}>$505.50</Text>
            </View>
            <View style={[styles.bannerDivider, { backgroundColor: T.primaryBorder }]} />
            <View style={styles.bannerCol}>
              <Text style={[styles.bannerLabel, { color: T.ink2 }]}>Прибыль</Text>
              <Text style={[styles.bannerValue, { color: T.mint }]}>$1 634</Text>
            </View>
          </View>
        </View>

        {/* Expense list */}
        <Text style={[styles.sectionTitle, { color: T.ink2 }]}>Последние расходы</Text>
        <View style={styles.list}>
          {EXPENSES.map((exp, i) => (
            <View
              key={i}
              style={[
                styles.expCard,
                { backgroundColor: cardBg, borderColor: T.line },
              ]}
            >
              <View style={[styles.expDot, { backgroundColor: T.primarySoft }]}>
                <Text style={{ fontSize: 16 }}>💸</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.expLabel, { color: T.ink }]}>{exp.label}</Text>
                <Text style={[styles.expCat, { color: T.ink3 }]}>{exp.cat}</Text>
              </View>
              <Text style={[styles.expAmount, { color: T.coral }]}>{exp.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <SettingsModal
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 12,
  },
  subtitle: { fontSize: 13, fontFamily: 'Nunito_600SemiBold' },
  title: { fontFamily: 'Comfortaa_700Bold', fontSize: 28, marginTop: 2 },
  settingsBtn: {
    width: 46, height: 46,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  banner: {
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 16,
    marginBottom: 20,
  },
  bannerRow: { flexDirection: 'row', alignItems: 'center' },
  bannerCol: { flex: 1, alignItems: 'center' },
  bannerLabel: { fontSize: 11, fontFamily: 'Nunito_600SemiBold', marginBottom: 4 },
  bannerValue: { fontFamily: 'Comfortaa_700Bold', fontSize: 18 },
  bannerDivider: { width: 1, height: 40, borderRadius: 1, marginHorizontal: 8 },
  sectionTitle: {
    paddingHorizontal: 22,
    fontSize: 12,
    fontFamily: 'Nunito_800ExtraBold',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  list: { paddingHorizontal: 16, gap: 8 },
  expCard: {
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  expDot: {
    width: 40, height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expLabel: { fontSize: 14, fontFamily: 'Nunito_700Bold' },
  expCat: { fontSize: 12, fontFamily: 'Nunito_400Regular', marginTop: 2 },
  expAmount: { fontFamily: 'Comfortaa_700Bold', fontSize: 15 },
  // Settings modal
  settingsBg: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(16,10,28,0.5)',
  },
  settingsSheet: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 22,
  },
  handleWrap: { alignItems: 'center', paddingTop: 10, paddingBottom: 16 },
  handle: { width: 44, height: 5, borderRadius: 4 },
  settingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingsTitle: { fontFamily: 'Comfortaa_700Bold', fontSize: 22 },
  closeBtn: {
    width: 40, height: 40,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  rowLabel: { fontSize: 15, fontFamily: 'Nunito_700Bold' },
  rowSub: { fontSize: 12, fontFamily: 'Nunito_400Regular', marginTop: 2 },
  accentTitle: {
    fontSize: 12,
    fontFamily: 'Nunito_800ExtraBold',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  accentGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  accentItem: {
    width: '30%',
    borderRadius: 14,
    padding: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  accentDot: {
    width: 24, height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accentLabel: { fontSize: 12, fontFamily: 'Nunito_700Bold' },
});
