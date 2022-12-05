import { test, request, expect } from '@playwright/test'
import {sign} from "../lib/sign";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

test('should create an user', async ({ page }) => {
    const context = await request.newContext({
        baseURL: 'http://localhost:3001'
    });
    const token = await sign({ email: `temp@uabc.edu.mx` }) as string;
    const user = await context.post('/api/users', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: {
            email: 'abc@uabc.edu.mx',
            claims: ['income_academic_mobilities.*']
        }
    });
    expect(user.ok()).toBeTruthy();
})