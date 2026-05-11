// ESLint v9 flat config — Next.js 15 권장 패턴.
// next/core-web-vitals + next/typescript 통합 (eslint-config-next).
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**'],
  },
];
