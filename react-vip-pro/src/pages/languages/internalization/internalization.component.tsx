import { useState, useEffect } from "react";
import { Button } from "antd";
import { useTranslate } from "../../../hooks/use-translate";
import {
  useTranslation,
  useCommonTranslation,
} from "../../../services/translate.service";
import { useAppDispatch } from "../../../hooks/redux.hooks";
import { setCurrentLanguage } from "../../../store/slices/locale.slice";
import { appInitializationService } from "../../../services/app-initialization.service";
import { LanguageDto, TranslationData } from "../../../types/language";
import useHeader from "@/hooks/use-header.hook";

const InternalizationComponent = () => {
  useHeader("", []);

  const dispatch = useAppDispatch();
  const {
    currentLanguage,
    languages,
    getAvailableLanguages,
    isTranslationLoading,
  } = useTranslate();

  const translate = useTranslation();
  const commonTranslate = useCommonTranslation();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [allTranslations, setAllTranslations] = useState<
    Record<string, TranslationData>
  >({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const cachedTranslations = appInitializationService.getCachedTranslations();
    setAllTranslations(cachedTranslations);
  };

  const selectLanguage = (language: LanguageDto) => {
    dispatch(setCurrentLanguage(language.code));
  };

  const getCurrentLanguageDetails = (): LanguageDto | undefined => {
    return languages.find((lang) => lang.code === currentLanguage);
  };

  const getNamespaces = (): string[] => {
    const translations = allTranslations[currentLanguage];
    return translations ? Object.keys(translations).sort() : [];
  };

  const getTranslationsForNamespace = (
    namespace: string
  ): Record<string, string> => {
    const translations = allTranslations[currentLanguage];
    return translations?.[namespace] || {};
  };

  const getTranslationCount = (namespace: string): number => {
    return Object.keys(getTranslationsForNamespace(namespace)).length;
  };

  const getTotalNamespaces = (): number => {
    const translations = allTranslations[currentLanguage];
    return translations ? Object.keys(translations).length : 0;
  };

  const getTotalTranslationKeys = (): number => {
    const translations = allTranslations[currentLanguage];
    if (!translations) return 0;

    return Object.values(translations).reduce((total, namespace) => {
      return total + Object.keys(namespace).length;
    }, 0);
  };

  const getCacheStatus = (): string => {
    const hasLanguages = languages.length > 0;
    const hasTranslations = Object.keys(allTranslations).length > 0;

    if (hasLanguages && hasTranslations) {
      return "Loaded";
    } else if (hasLanguages || hasTranslations) {
      return "Partial";
    } else {
      return "Empty";
    }
  };

  const refreshCache = async () => {
    setIsRefreshing(true);
    try {
      await appInitializationService.refreshLanguageData();
      loadData();
    } catch (error) {
      console.error("Failed to refresh cache:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const availableLanguages = getAvailableLanguages();
  const currentLanguageDetails = getCurrentLanguageDetails();

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Internationalization Test Page
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test translation functionality and language switching
          </p>
        </div>

        {/* Language Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Language Selector
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => selectLanguage(language)}
                className={`flex items-center gap-3 p-3 border rounded-lg transition-colors duration-200 ${
                  currentLanguage === language.code
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <img
                  src={
                    language.flag_icon ||
                    `https://flagcdn.com/${language.flag_code?.toLowerCase()}.svg`
                  }
                  alt={`${language.name} Flag`}
                  className="w-6 h-4 rounded object-cover"
                />
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {language.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {language.code}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Language Info */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Current Language: {currentLanguage}
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Selected: {currentLanguageDetails?.name} (
            {currentLanguageDetails?.native_name})
          </div>
        </div>

        {/* Translation Testing */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Translation Testing
          </h2>
          <div className="grid gap-4">
            {/* Test Common Translations */}
            <div className="p-4 border rounded-lg dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Common Translations
              </h3>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    HELLO:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {commonTranslate.t("HELLO")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    WELCOME:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {commonTranslate.t("WELCOME")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    THANK_YOU:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {commonTranslate.t("THANK_YOU")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    SAVE:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {commonTranslate.t("SAVE")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    CANCEL:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {commonTranslate.t("CANCEL")}
                  </span>
                </div>
              </div>
            </div>

            {/* Test Auth Translations */}
            <div className="p-4 border rounded-lg dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Auth Translations
              </h3>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    LOGIN:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {translate.tNs("auth", "LOGIN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    LOGOUT:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {translate.tNs("auth", "LOGOUT")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    EMAIL:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {translate.tNs("auth", "EMAIL")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    PASSWORD:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {translate.tNs("auth", "PASSWORD")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Namespaces with Translations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            All Namespaces ({currentLanguage})
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {getNamespaces().map((namespace) => (
              <div
                key={namespace}
                className="border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
              >
                {/* Namespace Header */}
                <div className="p-4 border-b dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-t-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {namespace}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    {getTranslationCount(namespace)} translation keys
                  </p>
                </div>

                {/* Translations List */}
                <div className="p-4 max-h-80 overflow-y-auto">
                  <div className="space-y-3">
                    {Object.entries(getTranslationsForNamespace(namespace)).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="border-l-2 border-gray-200 dark:border-gray-700 pl-3 py-1"
                        >
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono uppercase tracking-wide mb-1">
                            {key}
                          </div>
                          <div className="text-sm text-gray-900 dark:text-white">
                            {value}
                          </div>
                        </div>
                      )
                    )}
                    {getTranslationCount(namespace) === 0 && (
                      <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm italic">
                        No translations available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {getNamespaces().length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                <div className="text-lg mb-2">📝</div>
                <div>No namespaces available for {currentLanguage}</div>
              </div>
            )}
          </div>
        </div>

        {/* Cache Information */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-200 mb-2">
            Cache Information
          </h3>
          <div className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <div>Available Languages: {availableLanguages.length}</div>
            <div>Total Namespaces: {getTotalNamespaces()}</div>
            <div>Total Translation Keys: {getTotalTranslationKeys()}</div>
            <div>Cache Status: {getCacheStatus()}</div>
            <div>Loading: {isTranslationLoading() ? "Yes" : "No"}</div>
          </div>
          <Button
            type="primary"
            onClick={refreshCache}
            loading={isRefreshing}
            className="mt-6"
          >
            {isRefreshing ? "Refreshing..." : "Refresh Cache"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InternalizationComponent;
