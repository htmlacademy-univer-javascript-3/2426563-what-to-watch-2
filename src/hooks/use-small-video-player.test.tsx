/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { renderHook, act } from '@testing-library/react';
import useSmallVideoPlayer from './use-small-video-player';

vi.useFakeTimers();

describe('Hook: useSmallVideoPlayer', () => {
  it('should return expected elements', () => {
    const videoRefMock = {
      current: null,
    };
    const { result } = renderHook(() => useSmallVideoPlayer(videoRefMock));
    const { isHovered, handleMouseEnter, handleMouseLeave } = result.current;

    expect(isHovered).toBeFalsy();
    expect(typeof handleMouseLeave).toBe('function');
    expect(typeof handleMouseEnter).toBe('function');
  });

  it('should be correctly change state handleMouseEnter()', () => {
    const videoRefMock = {
      current: null,
    };
    const { result } = renderHook(() => useSmallVideoPlayer(videoRefMock));

    act(() => {
      result.current.handleMouseEnter();
    });

    expect(result.current.isHovered).toBeTruthy();
  });

  it('should be correctly change state handleMouseLeave()', () => {
    const videoRefMock = {
      current: null,
    };
    const { result } = renderHook(() => useSmallVideoPlayer(videoRefMock));
    const { isHovered, handleMouseEnter, handleMouseLeave } = result.current;

    act(() => handleMouseEnter());
    act(() => handleMouseLeave());
    expect(isHovered).toBeFalsy();
  });
});
