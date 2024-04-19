import { z } from 'zod';
import { REGEX } from '@/constants/VALIDATION';

type Validation = z.infer<typeof Validation>;

export const Validation = z
  .object({
    email: z.string().email('이메일 형식으로 작성해주세요.'),
    name: z.string().min(10, '열 자 이하로 작성해주세요.'),
    password: z
      .string()
      .regex(
        REGEX.PASSWORD,
        '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.',
      ),
    passwordCheck: z.string(),
    nowPassword: z
      .string()
      .regex(
        REGEX.PASSWORD,
        '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.',
      ),
    newPassword: z
      .string()
      .regex(
        REGEX.PASSWORD,
        '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.',
      ),
    newPasswordCheck: z
      .string()
      .regex(
        REGEX.PASSWORD,
        '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.',
      ),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  })
  .refine((data) => data.newPassword === data.newPasswordCheck, {
    path: ['newPasswordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  })
  .refine((data) => data.nowPassword !== data.newPassword, {
    path: ['newPassword'],
    message: '현재 비밀번호와 새 비밀번호는 같을 수 없습니다.',
  });