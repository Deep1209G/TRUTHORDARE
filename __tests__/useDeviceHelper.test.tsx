import TestRenderer, { act } from 'react-test-renderer';

import { Platform, useWindowDimensions } from 'react-native';

import { useDeviceHelper } from '../src/hooks/useDeviceHelper';
import type { UseDeviceHelperResult } from '../src/hooks/useDeviceHelper';

jest.mock('react-native/Libraries/Utilities/useWindowDimensions', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseWindowDimensions = useWindowDimensions as jest.Mock;

let lastResult: UseDeviceHelperResult | undefined;

function Harness() {
  lastResult = useDeviceHelper();
  return null;
}

function getResult(): UseDeviceHelperResult {
  if (!lastResult) {
    throw new Error('useDeviceHelper was never rendered');
  }
  return lastResult;
}

function mockDimensions(width: number, height: number) {
  mockedUseWindowDimensions.mockReturnValue({ width, height });
}

function setPlatform(os: 'ios' | 'android') {
  Object.defineProperty(Platform, 'OS', { value: os, configurable: true });
}

let renderer: TestRenderer.ReactTestRenderer | undefined;

async function renderHook() {
  await act(() => {
    renderer = TestRenderer.create(<Harness />);
  });
}

describe('useDeviceHelper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    lastResult = undefined;
    setPlatform('ios');
    mockDimensions(390, 844);
  });

  it('exposes the current window dimensions', async () => {
    await renderHook();

    expect(getResult().width).toBe(390);
    expect(getResult().height).toBe(844);
  });

  it('reports the platform', async () => {
    await renderHook();
    expect(getResult().isIOS).toBe(true);
    expect(getResult().isAndroid).toBe(false);

    setPlatform('android');
    await renderHook();

    expect(getResult().isIOS).toBe(false);
    expect(getResult().isAndroid).toBe(true);
  });

  it('scales sizes against the base design size', async () => {
    await renderHook();

    expect(getResult().scaleWidth(10)).toBe(10);
    expect(getResult().scaleHeight(10)).toBe(10);

    mockDimensions(468, 1055);
    await act(() => {
      renderer?.update(<Harness />);
    });

    expect(getResult().scaleWidth(10)).toBe(12);
    expect(getResult().scaleHeight(10)).toBe(12.5);
  });

  it('recomputes when the window dimensions change', async () => {
    await renderHook();
    expect(getResult().width).toBe(390);

    mockDimensions(844, 390);
    await act(() => {
      renderer?.update(<Harness />);
    });

    expect(getResult().width).toBe(844);
    expect(getResult().height).toBe(390);
  });
});
