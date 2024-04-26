
import React, { useState } from 'react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon, Collapse } from '@mantine/core';
import { IconChefHat } from '@tabler/icons-react';
import classes from '../styles/Card.module.css';

interface RecipeCardProps {
    recipe: Recipe; // The recipe object to display
}



/*
 <Collapse in={expanded}> {/* Collapsible section for additional information }
                <Text size="sm" color="dimmed" style={{ marginTop: '10px' }}>
                    Directions: {recipe.directions} {/* Display the directions }
                </Text>
            </Collapse>

            <Button
                variant="light"
                color="blue"
                fullWidth
                style={{ marginTop: '10px' }}
                onClick={(e) => {
                    e.stopPropagation(); // Prevents click from propagating
                    setExpanded(!expanded); // Toggle expansion on button click
                }}
            >
                {expanded ? 'Hide Directions' : 'Show Directions'}
            </Button>
            */


const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <Card withBorder radius="md" p="md" className={classes.card} style={{ width: "100%" }} onClick={() => setExpanded(!expanded)}>
            <Card.Section className={classes.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        {recipe.recipe_name}
                    </Text>
                </Group>
                <Text mt="md" className={classes.label} c="dimmed">
                    {recipe.cuisine_type}
                </Text>

                <Text size="sm" color="dimmed">
                    Cooking Time: {recipe.cooking_time} mins
                </Text>
                <Text size="sm" color="dimmed">
                </Text>
            </Card.Section>
            <Card.Section className={classes.section}>
                <Group gap={7} mt={5}>
                    <Text size="sm" color="dimmed">
                        Cooking Tools: {recipe.tools_needed}
                    </Text>
                    <Text size="sm" color="dimmed">
                        Ingredients: {recipe.ingredients.join(', ')}
                    </Text>
                </Group>
            </Card.Section>
            <Collapse in={expanded}>
                <Text size="sm" color="dimmed" style={{ marginTop: '10px' }}>
                    Directions: {recipe.directions} {/* Display the directions */}
                </Text>
            </Collapse>
            <Group mt="xs" style={{ position: "relative", bottom: "0" }}>
                <Button radius="md" style={{ flex: 1 }} onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(!expanded);
                }}>
                    {expanded ? 'Hide Directions' : 'Show Directions'}
                </Button>
                <ActionIcon variant="default" radius="md" size={36}>
                    <IconChefHat className={classes.like} stroke={1.5} />
                </ActionIcon>
            </Group>
        </Card >
    );
}

export default RecipeCard;


