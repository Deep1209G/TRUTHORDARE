/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useEffect } from 'react';

import { View, Image } from 'react-native';
import Svg, {
  Path,
  Circle,
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
} from 'react-native-svg';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withSequence,
  withRepeat,
  interpolate,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

import { Box, Text } from '@src';
import { useGame } from '../context/GameContext';
import { useDeviceHelper } from '../hooks/useDeviceHelper';

type Props = {
  rotation: number;
};

function pol(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(
  cx: number,
  cy: number,
  rIn: number,
  rOut: number,
  start: number,
  end: number,
) {
  const o1 = pol(cx, cy, rOut, start);
  const o2 = pol(cx, cy, rOut, end);
  const i1 = pol(cx, cy, rIn, end);
  const i2 = pol(cx, cy, rIn, start);
  const large = end - start > 180 ? 1 : 0;
  return `M ${o1.x} ${o1.y} A ${rOut} ${rOut} 0 ${large} 1 ${o2.x} ${o2.y} L ${i1.x} ${i1.y} A ${rIn} ${rIn} 0 ${large} 0 ${i2.x} ${i2.y} Z`;
}

const softColors = ['#FBBF24', '#34D399', '#F472B6', '#FB923C', '#A78BFA', '#67E8F9'];

export default function GameBoard({ rotation }: Props) {
  const { players, selectedPlayerIndex, spinning, selectedBottle, selectedBoard } =
    useGame();
  const device = useDeviceHelper();
  const bottleRotation = useSharedValue(0);
  const highlightAnim = useSharedValue(0);

  const board = Math.min(
    device.scaleWidth(360),
    device.width * 0.92,
    device.height * 0.47,
  );
  const c = board / 2;
  const outerR = board * (170 / 360);
  const innerR = board * (108 / 360);
  const avatarR = board * (142 / 360);
  const d2 = board * (2 / 360);
  const d3 = board * (3 / 360);
  const d6 = board * (6 / 360);
  const d12 = board * (12 / 360);
  const d14 = board * (14 / 360);

  useEffect(() => {
    bottleRotation.value = withTiming(rotation, { duration: 4200 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotation]);

  useEffect(() => {
    if (!spinning && selectedPlayerIndex >= 0) {
      highlightAnim.value = withSequence(
        withTiming(1, { duration: 300 }),
        withRepeat(
          withSequence(
            withTiming(0.4, { duration: 800 }),
            withTiming(1, { duration: 800 }),
          ),
          -1,
          true,
        ),
      );
    } else {
      highlightAnim.value = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning, selectedPlayerIndex]);

  const bottleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${bottleRotation.value}deg` }],
  }));

  const pathProps = useAnimatedProps(() => ({
    opacity: interpolate(highlightAnim.value, [0, 1], [0.18, 0.55]),
  }));

  const avatarHighlightStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(highlightAnim.value, [0, 1], [1, 1.15]) }],
  }));

  const numPlayers = players.length;
  const seg = 360 / numPlayers;

  const data = useMemo(() => {
    return players.map((player, i) => {
      const start = i * seg;
      const end = (i + 1) * seg;
      const mid = start + seg / 2;
      return {
        player,
        start,
        end,
        mid,
        index: i,
        avatarPos: pol(c, c, avatarR, mid),
      };
    });
  }, [seg, players, c, avatarR]);

  const hasSelection = !spinning && selectedPlayerIndex >= 0;

  return (
    <View style={{ alignItems: 'center' }}>
      {/* Pointer */}
      <Svg
        width={device.scaleWidth(24)}
        height={device.scaleHeight(22)}
        viewBox="0 0 24 22"
        style={{ position: 'absolute', top: board * (16 / 360), zIndex: 10 }}>
        <Path d="M12,22 L2,0 L22,0 Z" fill={selectedBoard.pointer} />
      </Svg>

      {/* Board */}
      <View
        style={{
          width: board,
          height: board,
          borderRadius: board / 2,
          overflow: 'hidden',
        }}>
        <Svg width={board} height={board} viewBox={`0 0 ${board} ${board}`}>
          <Defs>
            <RadialGradient id="boardBg" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={selectedBoard.bgStart} />
              <Stop offset="100%" stopColor={selectedBoard.bgEnd} />
            </RadialGradient>

            <RadialGradient id="centerBg" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={selectedBoard.bgStart} />
              <Stop offset="100%" stopColor={selectedBoard.bgEnd} />
            </RadialGradient>

            <RadialGradient id="softGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={selectedBoard.glow} stopOpacity="0.08" />
              <Stop offset="100%" stopColor={selectedBoard.glow} stopOpacity="0" />
            </RadialGradient>

            <LinearGradient id="borderGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor={selectedBoard.borderC1} stopOpacity="0.4" />
              <Stop offset="50%" stopColor={selectedBoard.borderC2} stopOpacity="0.25" />
              <Stop offset="100%" stopColor={selectedBoard.borderC1} stopOpacity="0.4" />
            </LinearGradient>
          </Defs>

          {/* Board background */}
          <Circle cx={c} cy={c} r={outerR + d6} fill={selectedBoard.bgEnd} />
          <Circle cx={c} cy={c} r={outerR + d3} fill="url(#boardBg)" />

          {/* Thin outer glow border */}
          <Circle
            cx={c}
            cy={c}
            r={outerR + d2}
            fill="none"
            stroke="url(#borderGrad)"
            strokeWidth="1.5"
          />

          {/* Segments */}
          {data.map(({ player, start, end }) => (
            <Path
              key={player.name}
              d={arcPath(c, c, innerR + d14, outerR, start, end)}
              fill={player.color}
              opacity={0.18}
            />
          ))}

          {/* Selected segment highlight (animated) */}
          {hasSelection && data[selectedPlayerIndex] && (
            <AnimatedPath
              animatedProps={pathProps}
              d={arcPath(
                c,
                c,
                innerR + d14,
                outerR,
                data[selectedPlayerIndex].start,
                data[selectedPlayerIndex].end,
              )}
              fill={data[selectedPlayerIndex].player.color}
            />
          )}

          {/* Soft dividers */}
          {data.map(({ start }, i) => {
            const p1 = pol(c, c, innerR + d14, start);
            const p2 = pol(c, c, outerR - board * (1 / 360), start);
            return (
              <Path
                key={`d-${i}`}
                d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`}
                stroke={softColors[i]}
                strokeWidth="1"
                strokeLinecap="round"
                opacity={0.3}
              />
            );
          })}

          {/* Inner ring border */}
          <Circle
            cx={c}
            cy={c}
            r={innerR + d12}
            fill="none"
            stroke={selectedBoard.ring}
            strokeWidth="1"
          />

          {/* Inner glow */}
          <Circle cx={c} cy={c} r={innerR + d6} fill="url(#softGlow)" />

          {/* Center dark circle */}
          <Circle cx={c} cy={c} r={innerR} fill="url(#centerBg)" />

          {/* Center border */}
          <Circle
            cx={c}
            cy={c}
            r={innerR}
            fill="none"
            stroke={selectedBoard.ring}
            strokeWidth="0.75"
          />
        </Svg>

        {/* Player avatars */}
        {data.map(({ player, avatarPos, index }) => {
          const isSelected = hasSelection && index === selectedPlayerIndex;
          const avatarSlot = board * (52 / 360);
          const avatarOffset = board * (26 / 360);
          return (
            <Box
              key={`p-${player.name}`}
              position="absolute"
              alignItems="center"
              style={{
                left: avatarPos.x - avatarOffset,
                top: avatarPos.y - avatarOffset,
                width: avatarSlot,
              }}>
              {isSelected ? (
                <Animated.View style={avatarHighlightStyle}>
                  <Box
                    width={board * (32 / 360)}
                    height={board * (32 / 360)}
                    borderRadius="circle"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                      backgroundColor: player.color,
                      shadowColor: player.color,
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.7,
                      shadowRadius: board * (10 / 360),
                      elevation: 8,
                    }}>
                    <Text
                      variant="bodyBold"
                      color="bgDeep">
                      {player.name[0]}
                    </Text>
                  </Box>
                </Animated.View>
              ) : (
                <View style={{ transform: [{ scale: 1 }] }}>
                  <Box
                    width={board * (32 / 360)}
                    height={board * (32 / 360)}
                    borderRadius="circle"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                      backgroundColor: player.color,
                      shadowColor: player.color,
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.25,
                      shadowRadius: board * (6 / 360),
                      elevation: 4,
                    }}>
                    <Text
                      variant="bodyBold"
                      color="bgDeep">
                      {player.name[0]}
                    </Text>
                  </Box>
                </View>
              )}
              <Text
                variant="micro"
                color={isSelected ? 'white' : 'textSecondary'}
                marginTop={board * (4 / 360)}
                style={{
                  textShadowColor: isSelected ? player.color : 'rgba(0,0,0,0.7)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: isSelected ? board * (6 / 360) : board * (2 / 360),
                }}>
                {player.name}
              </Text>
            </Box>
          );
        })}

        {/* Spinning bottle */}
        <Box
          position="absolute"
          width={innerR * 2}
          height={innerR * 2}
          style={{ left: c - innerR, top: c - innerR }}
          justifyContent="center"
          alignItems="center">
          <Animated.View style={bottleStyle}>
            <Image
              source={selectedBottle.image}
              style={{
                width: board * (70 / 360),
                height: board * (180 / 360),
                resizeMode: 'contain',
              }}
            />
          </Animated.View>
        </Box>
      </View>
    </View>
  );
}
