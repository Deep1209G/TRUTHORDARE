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


const BOARD = 360;
const C = BOARD / 2;
const OUTER_R = 170;
const INNER_R = 108;
const AVATAR_R = 142;

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
  const { players, selectedPlayerIndex, spinning } = useGame();
  const bottleRotation = useSharedValue(0);
  const highlightAnim = useSharedValue(0);

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
    transform: [{ rotate: `${interpolate(bottleRotation.value, [0, 360 * 20], [0, 7200])}deg` }],
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
        avatarPos: pol(C, C, AVATAR_R, mid),
      };
    });
  }, [seg, players]);

  const hasSelection = !spinning && selectedPlayerIndex >= 0;

  return (
    <View style={{ alignItems: 'center' }}>
      {/* Pointer */}
      <Svg
        width={24}
        height={22}
        viewBox="0 0 24 22"
        style={{ position: 'absolute', top: 16, zIndex: 10 }}>
        <Path d="M12,22 L2,0 L22,0 Z" fill="#E2E8F0" />
      </Svg>

      {/* Board */}
      <View
        style={{
          width: BOARD,
          height: BOARD,
          borderRadius: BOARD / 2,
          overflow: 'hidden',
        }}>
        <Svg width={BOARD} height={BOARD} viewBox={`0 0 ${BOARD} ${BOARD}`}>
          <Defs>
            <RadialGradient id="boardBg" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#1E293B" />
              <Stop offset="100%" stopColor="#0F172A" />
            </RadialGradient>

            <RadialGradient id="centerBg" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#1E293B" />
              <Stop offset="100%" stopColor="#0F172A" />
            </RadialGradient>

            <RadialGradient id="softGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#818CF8" stopOpacity="0.08" />
              <Stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
            </RadialGradient>

            <LinearGradient id="borderGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#818CF8" stopOpacity="0.4" />
              <Stop offset="50%" stopColor="#C084FC" stopOpacity="0.25" />
              <Stop offset="100%" stopColor="#818CF8" stopOpacity="0.4" />
            </LinearGradient>
          </Defs>

          {/* Board background */}
          <Circle cx={C} cy={C} r={OUTER_R + 6} fill="#0F172A" />
          <Circle cx={C} cy={C} r={OUTER_R + 3} fill="url(#boardBg)" />

          {/* Thin outer glow border */}
          <Circle
            cx={C}
            cy={C}
            r={OUTER_R + 2}
            fill="none"
            stroke="url(#borderGrad)"
            strokeWidth="1.5"
          />

          {/* Segments */}
          {data.map(({ player, start, end }) => (
            <Path
              key={player.name}
              d={arcPath(C, C, INNER_R + 14, OUTER_R, start, end)}
              fill={player.color}
              opacity={0.18}
            />
          ))}

          {/* Selected segment highlight (animated) */}
          {hasSelection && data[selectedPlayerIndex] && (
            <AnimatedPath
              animatedProps={pathProps}
              d={arcPath(
                C,
                C,
                INNER_R + 14,
                OUTER_R,
                data[selectedPlayerIndex].start,
                data[selectedPlayerIndex].end,
              )}
              fill={data[selectedPlayerIndex].player.color}
            />
          )}

          {/* Soft dividers */}
          {data.map(({ start }, i) => {
            const p1 = pol(C, C, INNER_R + 14, start);
            const p2 = pol(C, C, OUTER_R - 1, start);
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
            cx={C}
            cy={C}
            r={INNER_R + 12}
            fill="none"
            stroke="#334155"
            strokeWidth="1"
          />

          {/* Inner glow */}
          <Circle cx={C} cy={C} r={INNER_R + 6} fill="url(#softGlow)" />

          {/* Center dark circle */}
          <Circle cx={C} cy={C} r={INNER_R} fill="url(#centerBg)" />

          {/* Center border */}
          <Circle
            cx={C}
            cy={C}
            r={INNER_R}
            fill="none"
            stroke="#334155"
            strokeWidth="0.75"
          />
        </Svg>

        {/* Player avatars */}
        {data.map(({ player, avatarPos, index }) => {
          const isSelected = hasSelection && index === selectedPlayerIndex;
          return (
            <Box
              key={`p-${player.name}`}
              position="absolute"
              alignItems="center"
              style={{
                left: avatarPos.x - 26,
                top: avatarPos.y - 26,
                width: 52,
              }}>
              {isSelected ? (
                <Animated.View style={avatarHighlightStyle}>
                  <Box
                    width={32}
                    height={32}
                    borderRadius="circle"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                      backgroundColor: player.color,
                      shadowColor: player.color,
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.7,
                      shadowRadius: 10,
                      elevation: 8,
                    }}>
                    <Text fontSize={14} fontWeight="700" color="bgDeep">
                      {player.name[0]}
                    </Text>
                  </Box>
                </Animated.View>
              ) : (
                <View style={{ transform: [{ scale: 1 }] }}>
                  <Box
                    width={32}
                    height={32}
                    borderRadius="circle"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                      backgroundColor: player.color,
                      shadowColor: player.color,
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.25,
                      shadowRadius: 6,
                      elevation: 4,
                    }}>
                    <Text fontSize={14} fontWeight="700" color="bgDeep">
                      {player.name[0]}
                    </Text>
                  </Box>
                </View>
              )}
              <Text
                fontSize={9}
                fontWeight="600"
                color={isSelected ? 'white' : 'textSecondary'}
                marginTop={4}
                style={{
                  textShadowColor: isSelected ? player.color : 'rgba(0,0,0,0.7)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: isSelected ? 6 : 2,
                }}>
                {player.name}
              </Text>
            </Box>
          );
        })}

        {/* Spinning bottle */}
        <Box
          position="absolute"
          width={INNER_R * 2}
          height={INNER_R * 2}
          style={{ left: C - INNER_R, top: C - INNER_R }}
          justifyContent="center"
          alignItems="center">
          <Animated.View style={bottleStyle}>
            <Image
              source={require('../assets/images/vodka.png')}
              style={{ width: 70, height: 180, resizeMode: 'contain' }}
            />
          </Animated.View>
        </Box>
      </View>
    </View>
  );
}
