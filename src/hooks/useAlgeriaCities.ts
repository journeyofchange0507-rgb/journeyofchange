'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { AlgeriaCityRaw, Wilaya, Commune } from '@/types';

export function useAlgeriaCities() {
  const [rawData, setRawData] = useState<AlgeriaCityRaw[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadCities() {
      try {
        setLoading(true);
        // جلب البيانات من المجلد العام لتحسين الأداء وتجنب تضخيم حزمة البداية (Bundle Size)
        const res = await fetch('/assets/algeria_cities.json');
        if (!res.ok) {
          throw new Error('فشل في تحميل بيانات الولايات والبلديات');
        }
        const data: AlgeriaCityRaw[] = await res.json();
        if (isMounted) {
          setRawData(data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'حدث خطأ أثناء تحميل قائمة المدن');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCities();
    return () => {
      isMounted = false;
    };
  }, []);

  // معالجة وتجميع البيانات المخزنة مؤقتاً (Memoized Wilayas List)
  const wilayas = useMemo(() => {
    if (!rawData.length) return [];

    const wilayaMap = new Map<string, { code: string; name: string; nameAscii: string }>();

    rawData.forEach((item) => {
      if (!wilayaMap.has(item.wilaya_code)) {
        wilayaMap.set(item.wilaya_code, {
          code: item.wilaya_code,
          name: item.wilaya_name,
          nameAscii: item.wilaya_name_ascii,
        });
      }
    });

    // ترتيب الولايات حسب رمز الولاية تصاعدياً (01 إلى 58)
    return Array.from(wilayaMap.values()).sort((a, b) => parseInt(a.code, 10) - parseInt(b.code, 10));
  }, [rawData]);

  // دالة لجلب بلديات ولاية معينة بسرعة
  const getCommunesByWilayaCode = useCallback(
    (wilayaCode: string): Commune[] => {
      if (!wilayaCode || !rawData.length) return [];

      return rawData
        .filter((item) => item.wilaya_code === wilayaCode)
        .map((item) => ({
          id: item.id,
          name: item.commune_name,
          nameAscii: item.commune_name_ascii,
          dairaName: item.daira_name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name, 'ar'));
    },
    [rawData]
  );

  return {
    wilayas,
    getCommunesByWilayaCode,
    loading,
    error,
  };
}
