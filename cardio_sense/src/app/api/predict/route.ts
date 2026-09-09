import { NextRequest, NextResponse } from 'next/server';
import { predictHeartDisease } from '@/lib/model';
import { PatientData } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PatientData;

    // Validate essential numerical ranges
    if (
      typeof body.age !== 'number' ||
      typeof body.restingBP !== 'number' ||
      typeof body.cholesterol !== 'number' ||
      typeof body.maxHR !== 'number' ||
      typeof body.oldpeak !== 'number'
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid clinical numerical values' },
        { status: 400 }
      );
    }

    const result = predictHeartDisease(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process clinical inference', details: String(error) },
      { status: 500 }
    );
  }
}
