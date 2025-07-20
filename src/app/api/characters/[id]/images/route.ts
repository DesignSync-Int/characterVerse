import { NextRequest, NextResponse } from 'next/server'
import { CharacterImageService } from '@/lib/image-service'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const character = await prisma.character.findUnique({
      where: { id },
      include: { universe: true },
    });

    if (!character) {
      return NextResponse.json(
        { error: "Character not found" },
        { status: 404 }
      );
    }

    // Search for available images
    const imageOptions = await CharacterImageService.searchCharacterImages(
      character.name,
      character.universe.name
    );

    return NextResponse.json({
      character: {
        id: character.id,
        name: character.name,
        currentImage: character.imageUrl,
        imageSource: character.imageSource,
        imageLicense: character.imageLicense,
        imageAttribution: character.imageAttribution,
      },
      imageOptions,
    });
  } catch (error) {
    console.error("Error fetching character images:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { imageUrl, source, license, attribution } = await request.json();

    // Validate the image URL
    if (imageUrl && !(await CharacterImageService.validateImageUrl(imageUrl))) {
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
    }

    const updatedCharacter = await prisma.character.update({
      where: { id },
      data: {
        imageUrl,
        imageSource: source,
        imageLicense: license,
        imageAttribution: attribution,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      character: {
        id: updatedCharacter.id,
        imageUrl: updatedCharacter.imageUrl,
        imageSource: updatedCharacter.imageSource,
        imageLicense: updatedCharacter.imageLicense,
      },
    });
  } catch (error) {
    console.error("Error updating character image:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
