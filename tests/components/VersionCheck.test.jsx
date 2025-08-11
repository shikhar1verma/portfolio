import { render, act } from '@testing-library/react';
jest.mock('@/components/reload', () => ({ __esModule: true, reloadPage: jest.fn() }));
import { reloadPage } from '@/components/reload';
import VersionCheck from '@/components/VersionCheck';

beforeEach(() => {
  jest.useFakeTimers();
  localStorage.clear();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
});

function mockFetchBuild(version, builtAt = Date.now()) {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ version, builtAt }) });
}

describe('VersionCheck', () => {
  test('reloads when server version changes', async () => {
    mockFetchBuild('v1', Date.now());
    render(<VersionCheck />);
    await act(async () => {});

    mockFetchBuild('v2', Date.now());
    await act(async () => {
      jest.advanceTimersByTime(60 * 1000);
    });

    expect(reloadPage).toHaveBeenCalled();
  });

  test('reloads when stored build is older than 30 days', async () => {
    const now = Date.now();
    mockFetchBuild('v1', now);
    render(<VersionCheck />);
    await act(async () => {});

    localStorage.setItem('build:version', 'v1');
    localStorage.setItem('build:time', String(now - 31 * 24 * 60 * 60 * 1000));

    await act(async () => {
      jest.advanceTimersByTime(60 * 1000);
    });

    expect(reloadPage).toHaveBeenCalled();
  });
}); 