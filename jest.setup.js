/* eslint-env jest */

// Fix for React Native 0.79 window property issue
if (typeof globalThis !== "undefined") {
  if (!globalThis.window) {
    globalThis.window = globalThis;
  }
}

// Set up React Native environment
require("react-native-gesture-handler/jestSetup");

// Mock expo modules
jest.mock("expo-font", () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
  isLoaded: jest.fn(() => true),
  isLoading: jest.fn(() => false),
}));

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(() => Promise.resolve()),
  hideAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock("expo-linking", () => ({
  createURL: jest.fn((path) => `exp://localhost:19000/${path}`),
  parse: jest.fn((url) => ({path: url})),
  parseInitialURLAsync: jest.fn(() => Promise.resolve("")),
  addEventListener: jest.fn(() => ({remove: jest.fn()})),
}));

jest.mock("expo-router", () => ({
  useSegments: jest.fn(() => []),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(() => false),
  })),
  useLocalSearchParams: jest.fn(() => ({})),
  useGlobalSearchParams: jest.fn(() => ({})),
  useSearchParams: jest.fn(() => ({})),
  Stack: "Stack",
  Tabs: "Tabs",
  Link: "Link",
  Slot: "Slot",
  usePathname: jest.fn(() => "/"),
  useFocusEffect: jest.fn(),
}));

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  notificationAsync: jest.fn(() => Promise.resolve()),
  selectionAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: {
    Light: "Light",
    Medium: "Medium",
    Heavy: "Heavy",
    Soft: "Soft",
    Rigid: "Rigid",
  },
  NotificationFeedbackType: {
    Success: "Success",
    Warning: "Warning",
    Error: "Error",
  },
}));

jest.mock("expo-constants", () => ({
  manifest: {
    slug: "receipt-app",
    version: "1.0.0",
    extra: {},
  },
}));

jest.mock("@react-native-community/datetimepicker", () => {
  const React = require("react");
  const {View} = require("react-native");
  return (props) => <View {...props} />;
});

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    onAuthStateChanged: jest.fn(),
  })),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  initializeAuth: jest.fn(),
  browserLocalPersistence: "browserLocalPersistence",
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  addDoc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  serverTimestamp: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  onSnapshot: jest.fn(() => () => {}),
}));

jest.mock("@react-native-firebase/app", () => ({
  __esModule: true,
  default: {
    apps: [],
    initializeApp: jest.fn(() => Promise.resolve({})),
    app: jest.fn(() => ({
      name: "mock-app",
      options: {},
      delete: jest.fn(),
    })),
  },
}));

jest.mock("@react-native-firebase/auth", () => ({
  __esModule: true,
  default: () => ({
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    currentUser: null,
    onAuthStateChanged: jest.fn(),
  }),
}));

jest.mock("@react-native-firebase/firestore", () => ({
  __esModule: true,
  default: () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        id: "mock-id",
        set: jest.fn(),
        update: jest.fn(),
        onSnapshot: jest.fn(() => () => {}),
      })),
    })),
  }),
}));

jest.mock("@react-native-firebase/storage", () => ({
  __esModule: true,
  default: () => ({
    ref: jest.fn(() => ({
      putFile: jest.fn(() => ({
        on: jest.fn(),
      })),
      getDownloadURL: jest.fn(() => Promise.resolve("mock-url")),
    })),
  }),
}));

jest.mock("@expo/vector-icons", () => {
  const {View} = require("react-native");
  return {
    Ionicons: View,
    MaterialIcons: View,
    FontAwesome: View,
    MaterialCommunityIcons: View,
    Entypo: View,
    createIconSet: () => View,
  };
});

// Mock React Native modules
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

// Mock safe area context
jest.mock("react-native-safe-area-context", () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0};
  const frame = {x: 0, y: 0, width: 375, height: 812};
  return {
    SafeAreaProvider: ({children}) => children,
    SafeAreaView: ({children}) => children,
    SafeAreaConsumer: ({children}) => children(inset),
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => frame,
    initialWindowMetrics: {insets: inset, frame},
  };
});

// Mock React Navigation
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
      setOptions: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      reset: jest.fn(),
      isFocused: jest.fn(() => true),
      canGoBack: jest.fn(() => false),
    }),
    useRoute: () => ({
      key: "test",
      name: "Test",
      params: {},
    }),
    useFocusEffect: jest.fn(),
    useIsFocused: () => true,
    NavigationContainer: ({children}) => children,
    createNavigationContainerRef: jest.fn(() => ({
      current: null,
    })),
  };
});

// Mock gesture handler
jest.mock("react-native-gesture-handler", () => {
  const View = require("react-native").View;
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    gestureHandlerRootHOC: (component) => component,
    Directions: {},
    GestureHandlerRootView: View,
  };
});

// Mock reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock screens
jest.mock("react-native-screens", () => ({
  enableScreens: jest.fn(),
  screensEnabled: jest.fn(() => false),
  Screen: ({children}) => children,
  ScreenContainer: ({children}) => children,
  ScreenStack: ({children}) => children,
  ScreenStackHeaderConfig: ({children}) => children,
}));

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Global mocks
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(""),
    ok: true,
    status: 200,
    headers: new Headers(),
  })
);

global.FormData = jest.fn(() => ({
  append: jest.fn(),
}));

global.Blob = jest.fn();

// Suppress console warnings in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Warning:") ||
        args[0].includes("ReactNativeFiberHostComponent") ||
        args[0].includes("deprecated") ||
        args[0].includes("Animated") ||
        args[0].includes("Expected style"))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Warning:") ||
        args[0].includes("deprecated") ||
        args[0].includes("Animated"))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});
