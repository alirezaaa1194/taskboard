import {
  IsOptional,
  ValidateNested,
  IsString,
  IsArray,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

const ALLOWED_NODES = [
  'doc',
  'paragraph',
  'text',
  'heading',
  'bulletList',
  'orderedList',
  'listItem',
  'blockquote',
  'hardBreak',
];

const ALLOWED_MARKS = ['bold', 'italic', 'link'];

export class TiptapMarkDto {
  @ApiPropertyOptional({ enum: ALLOWED_MARKS })
  @IsIn(ALLOWED_MARKS)
  type: string;

  @ApiPropertyOptional()
  @IsOptional()
  attrs?: Record<string, any>;
}

export class TiptapNodeDto {
  @ApiPropertyOptional({ enum: ALLOWED_NODES })
  @IsIn(ALLOWED_NODES)
  type: string;

  @ApiPropertyOptional()
  @IsOptional()
  attrs?: Record<string, any>;

  @ApiPropertyOptional({ type: [TiptapNodeDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TiptapNodeDto)
  content?: TiptapNodeDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ type: [TiptapMarkDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TiptapMarkDto)
  marks?: TiptapMarkDto[];
}
